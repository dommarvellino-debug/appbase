import { useEffect, useRef, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Mail, Calendar, Save, Camera, Loader2, Globe } from 'lucide-react';
import { COUNTRIES, getCurrencyForCountry } from '@/lib/currency';
import { useCurrency } from '@/contexts/CurrencyContext';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [fullName, setFullName] = useState('');
  const [bio, setBio] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');
  const [country, setCountry] = useState('');
  const [saving, setSaving] = useState(false);
  const { setCurrency } = useCurrency();
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);
  const avatarInput = useRef(null);
  const bannerInput = useRef(null);

  useEffect(() => {
    base44.auth.me().then(u => {
      setUser(u);
      setFullName(u.full_name || '');
      setBio(u.bio || '');
      setAvatarUrl(u.avatar_url || '');
      setBannerUrl(u.banner_url || '');
      setCountry(u.country || '');
    });
  }, []);

  const uploadImage = async (file, setter) => {
    setUploading(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      setter(file_url);
    } catch { /* ignore */ }
    setUploading(false);
  };

  const save = async () => {
    setSaving(true);
    const currency = getCurrencyForCountry(country);
    const updated = await base44.auth.updateMe({ full_name: fullName, bio, avatar_url: avatarUrl, banner_url: bannerUrl, country, currency });
    setCurrency(currency);
    setUser(updated);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!user) return <div className="grid min-h-screen place-items-center"><div className="h-9 w-9 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600"/></div>;

  const initials = (user.full_name || user.email || '?').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  const memberSince = new Date(user.created_date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const field = 'w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50';

  return (
    <div className="mx-auto max-w-2xl px-4 py-7 sm:px-8 sm:py-10">
      <p className="text-sm font-semibold text-indigo-600">ACCOUNT</p>
      <h1 className="mt-1 text-3xl font-bold tracking-tight">Your profile</h1>
      <p className="mt-2 text-slate-500">Manage how you appear in the community.</p>

      <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-sm">
        {/* Banner */}
        <div className="relative h-36 sm:h-44">
          {bannerUrl
            ? <img src={bannerUrl} alt="Banner" className="h-full w-full object-cover"/>
            : <div className="h-full w-full bg-gradient-to-br from-indigo-400 via-violet-400 to-purple-500"/>}
          <button onClick={() => bannerInput.current?.click()} disabled={uploading} className="absolute right-3 top-3 flex items-center gap-1.5 rounded-xl bg-black/40 px-3 py-2 text-xs font-medium text-white backdrop-blur-sm transition hover:bg-black/60 disabled:opacity-50">
            {uploading ? <Loader2 size={14} className="animate-spin"/> : <Camera size={14}/>} {uploading ? 'Uploading...' : 'Change banner'}
          </button>
          <input ref={bannerInput} type="file" accept="image/*" className="hidden" onChange={e => e.target.files[0] && uploadImage(e.target.files[0], setBannerUrl)}/>
        </div>

        {/* Avatar + name */}
        <div className="px-6 pb-6">
          <div className="relative -mt-10 flex items-end gap-3 sm:-mt-12 sm:gap-4">
            <div className="relative shrink-0">
              {avatarUrl
                ? <img src={avatarUrl} alt="Avatar" className="h-20 w-20 rounded-full border-4 border-white object-cover shadow-md sm:h-24 sm:w-24"/>
                : <div className="grid h-20 w-20 place-items-center rounded-full border-4 border-white bg-gradient-to-br from-indigo-500 to-violet-500 text-xl font-bold text-white shadow-md sm:h-24 sm:w-24 sm:text-2xl">{initials}</div>}
              <button onClick={() => avatarInput.current?.click()} disabled={uploading} className="absolute bottom-0 right-0 grid h-8 w-8 place-items-center rounded-full border-2 border-white bg-indigo-600 text-white shadow-sm transition hover:bg-indigo-700 disabled:opacity-50">
                {uploading ? <Loader2 size={14} className="animate-spin"/> : <Camera size={14}/>}
              </button>
              <input ref={avatarInput} type="file" accept="image/*" className="hidden" onChange={e => e.target.files[0] && uploadImage(e.target.files[0], setAvatarUrl)}/>
            </div>
            <div className="min-w-0 flex-1 pb-1">
              <h2 className="truncate text-base font-bold sm:text-lg">{user.full_name || 'Unnamed'}</h2>
              <p className="truncate text-xs text-slate-500 sm:text-sm">{user.email}</p>
            </div>
          </div>

          <div className="mt-8 space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Full name</label>
              <input value={fullName} onChange={e => setFullName(e.target.value)} className={field} placeholder="Your name"/>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Bio</label>
              <textarea value={bio} onChange={e => setBio(e.target.value)} rows={3} className={`${field} resize-none`} placeholder="Tell the community a bit about yourself..."/>
            </div>
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700"><Globe size={15}/> Country &amp; currency</label>
              <select value={country} onChange={e => setCountry(e.target.value)} className={field}>
                <option value="">Select your country...</option>
                {COUNTRIES.map(c => <option key={c.code} value={c.code}>{c.flag} {c.name} ({c.currency})</option>)}
              </select>
            </div>

            <div className="flex flex-wrap items-center gap-4 rounded-xl bg-slate-50 p-4 text-sm">
              <div className="flex items-center gap-2 text-slate-600"><Mail size={16}/> {user.email}</div>
              <div className="flex items-center gap-2 text-slate-600"><Calendar size={16}/> Joined {memberSince}</div>
            </div>

            <button onClick={save} disabled={saving} className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-50">
              <Save size={16}/> {saving ? 'Saving...' : saved ? 'Saved!' : 'Save changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}