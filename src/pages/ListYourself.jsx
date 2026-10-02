import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import CloudinaryImage from '../components/CloudinaryImage';

const blank = { city: '', gender: '', skillLevel: 'beginner', price: '', age: '', bio: '', photoUrl: '', photoPublicId: '', garbaStyle: '', preferredEvent: '', availableDates: [] };
const maxPhotoSize = 5 * 1024 * 1024;

export default function ListYourself() {
  const navigate = useNavigate();
  const fileInput = useRef(null);
  const [form, setForm] = useState(blank);
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    api.get('/partners/me').then(({ data }) => {
      if (data) {
        setForm({ ...blank, ...data, price: String(data.price), age: data.age ? String(data.age) : '', availableDates: data.availableDates || [] });
        setPreviewUrl(data.photoUrl || '');
      }
    }).catch(() => {});
  }, []);

  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  const addDate = () => {
    if (date && !form.availableDates.some((item) => new Date(item).toDateString() === new Date(date).toDateString())) setForm({ ...form, availableDates: [...form.availableDates, date] });
    setDate('');
  };
  const saveProfile = () => api.put('/partners/me', form);
  const choosePhoto = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setMessage('Only JPG, JPEG, PNG, and WEBP images are allowed.');
      event.target.value = '';
      return;
    }
    if (file.size > maxPhotoSize) {
      setMessage('Profile photos must be 5 MB or smaller.');
      event.target.value = '';
      return;
    }
    setMessage('');
    if (previewUrl && selectedPhoto) URL.revokeObjectURL(previewUrl);
    setSelectedPhoto(file);
    setPreviewUrl(URL.createObjectURL(file));
  };
  const uploadPhoto = async () => {
    if (!selectedPhoto) return true;
    setUploading(true);
    setMessage('');
    try {
      await saveProfile();
      const body = new FormData();
      body.append('photo', selectedPhoto);
      const { data } = await api.post('/partners/photo', body);
      const temporaryPreview = previewUrl;
      setForm((current) => ({ ...current, photoUrl: data.photoUrl, photoPublicId: data.photoPublicId }));
      setSelectedPhoto(null);
      setPreviewUrl(data.photoUrl);
      if (temporaryPreview) URL.revokeObjectURL(temporaryPreview);
      setMessage('Profile photo uploaded successfully.');
      return true;
    } catch (error) {
      setMessage(error.response?.data?.message || 'Could not upload your profile photo.');
      return false;
    } finally {
      setUploading(false);
    }
  };
  const removeSelectedPhoto = () => {
    if (previewUrl && selectedPhoto) URL.revokeObjectURL(previewUrl);
    setSelectedPhoto(null);
    setPreviewUrl(form.photoUrl || '');
    if (fileInput.current) fileInput.current.value = '';
  };
  const submit = async (event) => {
    event.preventDefault();
    try {
      if (!(await uploadPhoto())) return;
      const { data } = await saveProfile();
      if (data.listingStatus === 'active' && data.isActive) navigate('/dashboard');
      else navigate('/payment/listing');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Could not save your profile.');
    }
  };

  return <div className="marketplace-page marketplace-form mx-auto max-w-2xl">
    <p className="font-semibold uppercase tracking-[.2em] text-magenta">Join the celebration</p>
    <h1 className="mt-2 font-display text-4xl font-bold text-maroon">List yourself as a partner</h1>
    <p className="mt-3 text-slate-600">Tell dancers a little about your style, availability and rate.</p>
    <form onSubmit={submit} className="mt-8 grid gap-5 rounded-3xl bg-white p-7 shadow-sm sm:grid-cols-2">
      <div className="field-label sm:col-span-2"><span>Profile photo</span><div className="mt-2 flex flex-wrap items-center gap-4"><div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-marigold/30 to-magenta/20">{previewUrl ? <img src={previewUrl} alt="Profile preview" className="h-full w-full object-contain" /> : <CloudinaryImage publicId="girl.png" alt="Profile preview" width={96} height={96} className="h-full w-full object-contain" />}</div><div className="flex flex-wrap gap-2"><input ref={fileInput} type="file" accept="image/jpeg,image/png,image/webp" onChange={choosePhoto} className="sr-only" /><button type="button" onClick={() => fileInput.current?.click()} className="rounded-xl bg-marigold px-4 py-2 font-bold text-maroon">{selectedPhoto ? 'Change photo' : 'Upload photo'}</button>{selectedPhoto && <button type="button" onClick={removeSelectedPhoto} className="rounded-xl border border-maroon/15 px-4 py-2 font-bold text-maroon">Remove</button>}{selectedPhoto && <button type="button" onClick={uploadPhoto} disabled={uploading} className="rounded-xl bg-maroon px-4 py-2 font-bold text-white">{uploading ? 'Uploading…' : 'Save photo'}</button>}</div></div><p className="mt-2 text-xs font-normal text-slate-500">JPG, PNG or WEBP, up to 5 MB.</p></div>
      {[
        ['city', 'City', 'Ahmedabad'], ['gender', 'Gender', 'Woman, Man, or Non-binary'], ['age', 'Age', '23'],
        ['price', 'Rate per night (₹)', '1200'], ['garbaStyle', 'Garba style', 'Traditional Garba, Raas…'], ['preferredEvent', 'Preferred event', 'Navratri Night 2026'],
      ].map(([name, label, placeholder]) => <label key={name} className="field-label">{label}<input required={['city', 'gender', 'price'].includes(name)} type={['price', 'age'].includes(name) ? 'number' : 'text'} min={name === 'price' ? '0' : name === 'age' ? '18' : undefined} name={name} value={form[name]} onChange={update} placeholder={placeholder} /></label>)}
      <label className="field-label sm:col-span-2">Dance experience<select name="skillLevel" value={form.skillLevel} onChange={update}><option value="beginner">Beginner</option><option value="intermediate">Intermediate</option><option value="pro">Pro</option></select></label>
      <label className="field-label sm:col-span-2">A little about you<textarea name="bio" rows="4" value={form.bio} onChange={update} placeholder="Your dance style, favourite Garba songs…" /></label>
      <div className="sm:col-span-2"><label className="field-label">Available dates</label><div className="mt-2 flex gap-2"><input className="flex-1 rounded-xl border border-maroon/15 px-3 py-3" type="date" value={date} onChange={(event) => setDate(event.target.value)} /><button type="button" onClick={addDate} className="rounded-xl bg-marigold px-4 font-bold text-maroon">Add date</button></div><div className="mt-2 flex flex-wrap gap-2">{form.availableDates.map((item, index) => <button type="button" key={index} onClick={() => setForm({ ...form, availableDates: form.availableDates.filter((_, itemIndex) => itemIndex !== index) })} className="rounded-full bg-cream px-3 py-1 text-sm">{new Date(item).toLocaleDateString()} ×</button>)}</div></div>
      {message && <p className="sm:col-span-2 text-magenta">{message}</p>}
      <button disabled={uploading} className="sm:col-span-2 rounded-full bg-maroon px-5 py-3 font-bold text-white">{uploading ? 'Saving photo…' : 'Save profile'}</button>
    </form>
  </div>;
}
