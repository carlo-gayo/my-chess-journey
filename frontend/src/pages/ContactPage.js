// src/pages/ContactPage.js
// Contact page — controlled form with validation and a success state.
// Demonstrates: useState for form data, validation logic, conditional rendering
// (success screen vs form), and .map() for the resources table.

import { useState } from 'react';
import chessResources from '../data/chessResources';

// ─── Useful chess links ──────────────────────────────────────────────────────
const CHESS_LINKS = [
  { url: 'https://www.chess.com',      name: 'Chess.com',          desc: 'Play chess online, solve puzzles, and take lessons from top instructors' },
  { url: 'https://lichess.org',        name: 'Lichess.org',        desc: 'Free, open-source chess server with powerful analysis tools' },
  { url: 'https://www.uschess.org',    name: 'US Chess Federation', desc: 'Official governing body for chess in the United States' },
  { url: 'https://www.chessgames.com', name: 'ChessGames.com',     desc: 'Massive database of historical chess games from grandmasters' },
];

// ─── Validation helper ───────────────────────────────────────────────────────
// Returns an object of field → error message strings.
// An empty object means the form is valid.
function validateForm(form) {
  const errors = {};

  if (!form.name.trim())
    errors.name = 'Name is required.';
  else if (form.name.trim().length < 2)
    errors.name = 'Name must be at least 2 characters.';
  else if (!/^[a-zA-Z\s]+$/.test(form.name.trim()))
    errors.name = 'Name should contain only letters and spaces.';

  if (!form.email.trim())
    errors.email = 'Email is required.';
  else if (!/^\S+@\S+\.\S+$/.test(form.email.trim()))
    errors.email = 'Please enter a valid email address.';

  if (!form.experience)
    errors.experience = 'Please select your chess experience level.';

  if (!form.message.trim())
    errors.message = 'Message is required.';
  else if (form.message.trim().length < 10)
    errors.message = 'Message must be at least 10 characters.';

  return errors;
}

// ─── Component ───────────────────────────────────────────────────────────────
function ContactPage() {
  // Controlled form state — one object for all fields (Step 4.2 pattern)
  const [formData, setFormData] = useState({
    name: '', email: '', experience: '', message: '',
  });

  // Error messages for each field
  const [errors, setErrors] = useState({});

  // Whether the form has been successfully submitted (Step 4.3 pattern)
  const [submitted, setSubmitted] = useState(false);

  // Single change handler for all text inputs and selects
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate a single field on blur (real-time feedback)
  const handleBlur = (fieldName) => {
    const newErrors = validateForm(formData);
    setErrors(prev => ({ ...prev, [fieldName]: newErrors[fieldName] || '' }));
  };

  // Full validation on submit
  const handleSubmit = () => {
    const newErrors = validateForm(formData);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
    }
  };

  // ── Conditional rendering: success screen vs contact form ────────────────
  if (submitted) {
    return (
      <>
        <main className='main-content'>
          <div className='success-screen'>
            <div className='success-icon'>♟️</div>
            <h2>Message Sent!</h2>
            <p>Thanks for reaching out. I'll get back to you as soon as possible.</p>
            <button
              className='btn-primary'
              style={{ marginTop: '1.5rem' }}
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: '', email: '', experience: '', message: '' });
              }}
            >
              Send Another Message
            </button>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <main className='main-content'>

        {/* ── Intro ── */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 className='section-heading'>Get in Touch</h2>
          <p>Have questions about chess? Want to connect with a fellow chess enthusiast? I'd love to hear from you!</p>
        </section>

        {/* ── Contact form ── */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 className='section-heading'>Send Me a Message</h2>

          <div className='form-wrapper'>

            {/* Name */}
            <div className='form-field'>
              <label htmlFor='name'>Your Name:</label>
              <input
                id='name'
                name='name'
                type='text'
                className='form-input'
                placeholder='Enter your full name'
                value={formData.name}
                onChange={handleChange}
                onBlur={() => handleBlur('name')}
              />
              <span className='error-msg'>{errors.name || ''}</span>
            </div>

            {/* Email */}
            <div className='form-field'>
              <label htmlFor='email'>Your Email:</label>
              <input
                id='email'
                name='email'
                type='email'
                className='form-input'
                placeholder='your.email@example.com'
                value={formData.email}
                onChange={handleChange}
                onBlur={() => handleBlur('email')}
              />
              <span className='error-msg'>{errors.email || ''}</span>
            </div>

            {/* Experience level */}
            <div className='form-field'>
              <label htmlFor='experience'>Chess Experience Level:</label>
              <select
                id='experience'
                name='experience'
                className='form-input'
                value={formData.experience}
                onChange={handleChange}
                onBlur={() => handleBlur('experience')}
              >
                <option value=''>Select your level</option>
                <option value='beginner'>Beginner — Just learning the rules</option>
                <option value='intermediate'>Intermediate — Play regularly</option>
                <option value='advanced'>Advanced — Competitive player</option>
                <option value='expert'>Expert — Tournament level</option>
              </select>
              <span className='error-msg'>{errors.experience || ''}</span>
            </div>

            {/* Message */}
            <div className='form-field'>
              <label htmlFor='message'>Your Message:</label>
              <textarea
                id='message'
                name='message'
                className='form-input'
                placeholder='Ask me about chess, share your thoughts, or just say hi!'
                value={formData.message}
                onChange={handleChange}
                onBlur={() => handleBlur('message')}
              />
              <span className='error-msg'>{errors.message || ''}</span>
            </div>

            <button className='btn-primary' onClick={handleSubmit}>
              Send Message
            </button>
          </div>
        </section>

        {/* ── Resources table — rendered with .map() ── */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 className='section-heading'>My Favorite Chess Resources</h2>
          <table>
            <thead>
              <tr>
                <th>Resource</th>
                <th>Type</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {chessResources.map(resource => (
                <tr key={resource.id}>
                  <td>{resource.name}</td>
                  <td>{resource.type}</td>
                  <td>{resource.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* ── Useful links ── */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 className='section-heading'>Useful Chess Websites</h2>
          <ul style={{ marginLeft: '1.5rem' }}>
            {CHESS_LINKS.map(({ url, name, desc }) => (
              <li key={url} style={{ marginBottom: '0.7rem' }}>
                <a href={url} target='_blank' rel='noopener noreferrer'>{name}</a> — {desc}
              </li>
            ))}
          </ul>
        </section>

        {/* ── Find me online ── */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 className='section-heading'>Where to Find Me</h2>
          <ul style={{ listStyle: 'none', marginLeft: 0 }}>
            <li style={{ marginBottom: '0.7rem' }}><strong>Chess.com Username:</strong> not_jycc</li>
            <li style={{ marginBottom: '0.7rem' }}><strong>Lichess Username:</strong> jycc_08</li>
            <li style={{ marginBottom: '0.7rem' }}><strong>Local Chess Club:</strong> Community Center Chess Club (meets every Saturday)</li>
          </ul>
        </section>

        {/* ── Map embed ── */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 className='section-heading'>Chess Club Location</h2>
          <p style={{ marginBottom: '1rem' }}>Our local chess club meets at the Community Recreation Center. Visitors and new members are always welcome!</p>
          <div className='map-container'>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d489619.72362172836!2d120.03498220222437!3d16.51831662563486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33917765554a3123%3A0x4b47191dcdf995a0!2sDon%20Mariano%20Marcos%20Memorial%20State%20University%20-%20South%20La%20Union!5e0!3m2!1sen!2sph!4v1768352888030!5m2!1sen!2sph'
              width='100%'
              height='400'
              style={{ border: 0, display: 'block' }}
              allowFullScreen
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
              title='Chess club location map'
            />
          </div>
          <p className='map-caption'>Dona Toribia Aspiras Road, Agoo, 2504, La Union</p>
        </section>

      </main>
    </>
  );
}

export default ContactPage;
