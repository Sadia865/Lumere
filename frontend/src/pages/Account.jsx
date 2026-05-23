import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

export default function Account() {
  const { user, updateProfile } = useAuth();

  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '' });
  const [pwForm, setPwForm] = useState({ currentPassword: '', newPassword: '' });
  const [profileStatus, setProfileStatus] = useState('idle');
  const [profileMsg,    setProfileMsg]    = useState('');
  const [pwStatus,      setPwStatus]      = useState('idle');
  const [pwMsg,         setPwMsg]         = useState('');

  const set   = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));
  const setPw = (k) => (e) => setPwForm(f => ({ ...f, [k]: e.target.value }));

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setProfileStatus('loading');
    setProfileMsg('');
    try {
      await updateProfile({ name: form.name, email: form.email });
      setProfileStatus('success');
      setProfileMsg('Profile updated successfully.');
    } catch (err) {
      setProfileStatus('error');
      setProfileMsg(err.response?.data?.message || 'Update failed.');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!pwForm.currentPassword || !pwForm.newPassword) {
      setPwStatus('error');
      setPwMsg('Both fields are required.');
      return;
    }
    if (pwForm.newPassword.length < 6) {
      setPwStatus('error');
      setPwMsg('Password must be at least 6 characters.');
      return;
    }
    setPwStatus('loading');
    setPwMsg('');
    try {
      await API.put('/users/change-password', pwForm);
      setPwStatus('success');
      setPwMsg('Password changed successfully.');
      setPwForm({ currentPassword: '', newPassword: '' });
    } catch (err) {
      setPwStatus('error');
      setPwMsg(err.response?.data?.message || 'Password change failed.');
    }
  };

  const inputStyle = {
    width: '100%', padding: '12px 16px',
    border: '1px solid rgba(26,26,24,0.2)', borderRadius: 4,
    background: 'var(--linen)', fontFamily: 'var(--body)',
    fontSize: '0.92rem', color: 'var(--charcoal)', outline: 'none',
  };
  const labelStyle = {
    fontSize: '0.75rem', letterSpacing: '0.12em',
    textTransform: 'uppercase', color: 'var(--warm-gray)',
    marginBottom: 6, display: 'block',
  };
  const msgStyle = (s) => ({
    background: s === 'success' ? 'rgba(123,143,114,0.1)' : '#fef2f2',
    borderRadius: 4, padding: '12px 16px', marginBottom: 16,
    color: s === 'success' ? 'var(--sage-dark)' : '#c0392b',
    fontSize: '0.85rem',
  });

  return (
    <div style={{ paddingTop: 'clamp(80px,10vw,120px)', minHeight: '80vh' }}>
      <div className="container" style={{ paddingBottom: 'var(--space-xl)', maxWidth: 680 }}>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 400, marginBottom: 8 }}>My Account</h1>
        <p style={{ color: 'var(--warm-gray)', marginBottom: 40, fontWeight: 300 }}>Manage your personal information</p>

        {/* Avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 36, padding: 24, background: 'var(--cream)', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--sage)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--serif)', fontSize: '1.5rem', fontStyle: 'italic', flexShrink: 0 }}>
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p style={{ fontFamily: 'var(--serif)', fontSize: '1.1rem' }}>{user?.name}</p>
            <p style={{ fontSize: '0.85rem', color: 'var(--warm-gray)', marginTop: 2 }}>{user?.email}</p>
            {user?.googleId && <p style={{ fontSize: '0.75rem', color: 'var(--sage)', marginTop: 4 }}>Signed in with Google</p>}
          </div>
        </div>

        {/* Profile form */}
        <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: '1.15rem', fontWeight: 400 }}>Personal Information</h2>
          {profileMsg && <div style={msgStyle(profileStatus)}>{profileMsg}</div>}
          {[['name','Full Name','text'],['email','Email Address','email']].map(([k,l,t]) => (
            <div key={k}><label style={labelStyle}>{l}</label><input type={t} value={form[k]} onChange={set(k)} style={inputStyle} /></div>
          ))}
          <button type="submit" className="btn-primary" disabled={profileStatus === 'loading'} style={{ alignSelf: 'flex-start' }}>
            {profileStatus === 'loading' ? 'Saving…' : 'Save Changes'}
          </button>
        </form>

        {/* Password form - hidden for Google users */}
        {!user?.googleId && (
          <form onSubmit={handleChangePassword} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: '1.15rem', fontWeight: 400 }}>Change Password</h2>
            {pwMsg && <div style={msgStyle(pwStatus)}>{pwMsg}</div>}
            {[['currentPassword','Current Password'],['newPassword','New Password']].map(([k,l]) => (
              <div key={k}><label style={labelStyle}>{l}</label><input type="password" value={pwForm[k]} onChange={setPw(k)} style={inputStyle} autoComplete="new-password" /></div>
            ))}
            <button type="submit" className="btn-primary" disabled={pwStatus === 'loading'} style={{ alignSelf: 'flex-start' }}>
              {pwStatus === 'loading' ? 'Changing…' : 'Change Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}