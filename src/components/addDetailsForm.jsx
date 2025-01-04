import React, { useState, useEffect } from 'react';

const AddDetailsPage = () => {
  const [formData, setFormData] = useState({
    date: '',
    technicianName: '',
    customerName: '',
    amount: '',
    mobileNumber: '',
    address: '',
    description: '',
  });
  
  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [submissionError, setSubmissionError] = useState(''); // New state for submission error

  const API_ENDPOINT = process.env.REACT_APP_ADD_CUSTOMER_DATA_API_ENDPOINT; // Use endpoint from .env

  // Log the API endpoint to ensure it's being read correctly
  useEffect(() => {
    console.log('API_ENDPOINT:', API_ENDPOINT);
  }, [API_ENDPOINT]);

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();

  const newErrors = {};

  // Validation for Kuwait 8-digit mobile number
  if (!/^\d{8}$/.test(formData.mobileNumber)) {
    newErrors.mobileNumber = 'Mobile number must be exactly 8 digits.';
  }

  setErrors(newErrors);

  // If no errors, submit the form
  if (Object.keys(newErrors).length === 0) {
    try {
      const response = await fetch(`${API_ENDPOINT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: formData.description,
          description: formData.description,
          address: formData.address,
          mobileNumber: formData.mobileNumber,
          amount: formData.amount,
          customerName: formData.customerName,
          technicianName: formData.technicianName,
          date: formData.date,
        }),
      });

      if (response.ok) {
        setFormData({
          date: '',
          technicianName: '',
          customerName: '',
          amount: '',
          mobileNumber: '',
          address: '',
          description: '',
        });
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);
        setSubmissionError('');
      } else {
        const errorData = await response.json();
        setSubmissionError(`Form submission failed: ${errorData.message}`);
      }
    } catch (error) {
      setSubmissionError('Error submitting form. Please try again.');
    }
  }
};
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Add Details / إضافة تفاصيل</h2>
      
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Date / تاريخ</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Technician Name / اسم الفني</label>
          <input
            type="text"
            name="technicianName"
            value={formData.technicianName}
            onChange={handleInputChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Customer Name / اسم العميل</label>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleInputChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Amount / مبلغ</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.inputGroup}>
  <label style={styles.label}>Mobile Number / رقم الجوال</label>
  <input
    type="text"
    name="mobileNumber"
    value={formData.mobileNumber}
    onChange={handleInputChange}
    onKeyDown={(e) => {
      if (!/^\d$/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Tab') {
        e.preventDefault();
      }
    }}
    maxLength={8} // Restrict to 8 characters
    style={{
      ...styles.input,
      ...(errors.mobileNumber ? styles.inputError : {}),
    }}
    required
  />
  {errors.mobileNumber && (
    <span style={styles.errorText}>{errors.mobileNumber}</span>
  )}
</div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Address / عنوان</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            style={styles.textarea}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Description / وصف</label>
          <select
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            style={errors.description ? styles.inputError : styles.input}
          >
            <option value="" disabled>
              Select status
            </option>
            <option value="Pending">Pending / قيد الانتظار</option>
            <option value="Completed">Completed / مكتمل</option>
          </select>
          {errors.description && <span style={styles.errorText}>{errors.description}</span>}
        </div>

        <button type="submit" style={styles.button}>Save / أنقذ
        </button>
      </form>

      {showPopup && (
        <div style={styles.popup}>
          <p>Form submitted successfully!</p>
        </div>
      )}

      {submissionError && ( // Display submission error message
        <div style={styles.errorText}>
          <p>{submissionError}</p>
        </div>
      )}
    </div>
  );
};

// Styling for the AddDetailsPage
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '5px',
    backgroundColor: '#f4f7fc',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    fontSize: '20px',
    color: '#333',
    marginBottom: '10px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '600px',
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  },
  inputGroup: {
    marginBottom: '20px',
    position: 'relative',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 'bold',
    fontSize: '14px',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '16px',
    color: '#333',
    outline: 'none',
    transition: 'border 0.3s',
  },
  inputError: {
    borderColor: '#ff4d4d',
    borderWidth: '2px',
  },
  textarea: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '16px',
    color: '#333',
    height: '120px',
    resize: 'vertical',
    transition: 'border 0.3s',
  },
  button: {
    padding: '12px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  errorText: {
    color: '#ff4d4d',
    fontSize: '12px',
    position: 'absolute',
    bottom: '-18px', // Place error directly below input
    left: '0',
  },
  popup: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
  },
};

export default AddDetailsPage;
