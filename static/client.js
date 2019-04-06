async function submit(SITEKEY) {
  const token = await grecaptcha.execute(SITEKEY, { action: 'submit' });
  const result = await fetch(`http://localhost:8000/api/get?token=${token}`);
  if (result.status === 200) alert('reCAPTCHAv3 OK!');
  else alert('reCAPTCHAv3 FAILED!');
}
