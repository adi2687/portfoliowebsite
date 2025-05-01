import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import './Form.css'; // Make sure this file exists and styles your form appropriately

const Form = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await emailjs.sendForm(
        'service_uet0wns',              // ✅ Replace with your actual EmailJS service ID
        'template_mjgdn3v',              // ✅ Replace with your actual EmailJS template ID
        form.current,
        'tVYHnLdWAWgc8ZPed'              // ✅ Replace with your actual EmailJS public key
      );

      if (result.text === 'OK') {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <form className="form" ref={form} onSubmit={handleSubmit}>
        {/* Hidden title field for EmailJS subject line */}
        <input type="hidden" name="title" value="Portfolio Contact Form Submission" />

        <div className="form-header">
          <h2>Contact Me</h2>
          <p>Feel free to reach out for any questions or opportunities!</p>
        </div>

        <div className="form-group">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
          />
        </div>

        <div className="form-group">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
          />
        </div>

        <div className="form-group">
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="submit-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="spinner"></span>
              Sending...
            </>
          ) : (
            'Send Message'
          )}
        </button>

        {submitStatus === 'success' && (
          <div className="submit-message success">
            ✅ Thank you! Your message has been sent successfully.
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="submit-message error">
            ❌ Sorry, something went wrong. Please try again or email me directly at adityakurani26@gmail.com
          </div>
        )}
      </form>
    </div>
  );
};

export default Form;
