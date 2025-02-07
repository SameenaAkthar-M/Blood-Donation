import React, { useEffect, useState } from 'react'
import moment from 'moment';
import './profile.css'
import useLocationData from '../../hooks/useLocationData';

const Profile = () => {
  const [user,setUser]=useState(null);
  const [editMode, setEditMode] = useState(false);  // New state for edit mode

  const {
    countryNames,
    countryCodes,
    states,
    city,
    handleCountryChange,
    handleStateChange,
  } = useLocationData();

  const bloodGroup=["A+","A-","A1+","A1-","A1B+","A1B-","A2+","A2-","A2B+","A2B-","AB+","AB-","B+","B-","Bombay Blood Group","INRA","O+","O-"];
  
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    bloodGroup: '',
    email: '',
    phone: '',
    donations: 0,
    country: '',
    state: '',
    city: '',
    availability: '',
  });

  useEffect(()=>{
    const storedUser=localStorage.getItem('user');
    console.log(storedUser)
    if(storedUser){
      try{
        const parsedUser=JSON.parse(storedUser);
        setUser(parsedUser);
        setFormData({
          name: parsedUser.name || '',
        dob: parsedUser.dob || '',
        bloodGroup: parsedUser.bloodGroup || '',
        email: parsedUser.email || '',
        phone: parsedUser.phone || '',
        donations: parsedUser.donations || 0,
        country: parsedUser.address?.country || '',
        state: parsedUser.address?.state || '',
        city: parsedUser.address?.city || '',
        availability: parsedUser.availability || '',
        });
      } catch(error){
        console.log(error);
      }
    }
  },[]);

  const handleChange=(e)=>{
    const {name,value}=e.target;
    setFormData(prevState=>({
      ...prevState,
      [name]:value
    }))
  }

  const handleCountryChangeAndUpdate = (e) => {
    const countryCode = e.target.value;

    setFilters((prevFilters) => ({
      ...prevFilters,
      country: countryCode,
      state: '',
      city: '',
    }));

    handleCountryChange(e);
    handleChange(e);
  };

  const handleStateChangeAndUpdate = (e) => {
    const stateCode = e.target.value;

    setFilters((prevFilters) => ({
      ...prevFilters,
      state: stateCode,
      city: '',
    }));
    handleStateChange(e);
    handleChange(e);
  };


  const handleEditToggle=()=>{
    setEditMode(prevState=>!prevState)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

  const userId = user._id;
  console.log('User ID:', userId);
  console.log('Form Data:', formData);

  try {
    const response = await fetch('http://localhost:3000/api/user/update-profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        ...formData,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      alert(data.message);

      setUser(data.user);
      setFormData({
        name: data.user.name || '',
        dob: data.user.dob || '',
        bloodGroup: data.user.bloodGroup || '',
        email: data.user.email || '',
        phone: data.user.phone || '',
        donations: data.user.donations || 0,
        country: data.user.address?.country || '',
        state: data.user.address?.state || '',
        city: data.user.address?.city || '',
        availability: data.user.availability || '',
      });
      localStorage.setItem('user', JSON.stringify(data.user));
      setEditMode(false);
    } else {
      const errorData = await response.json();
      alert(`Failed to update profile: ${errorData.message}`);
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    alert('Error updating profile');
  }
  };

  if(!user){
    return <div>Loading...</div>
  }

  return (
    <div className="profile-content">
      <h1>Profile</h1>
      <div className="user-detail">
        <form onSubmit={handleSubmit}>
          <div>
            <p><strong>Name</strong></p>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!editMode}
            />
          </div>
          {user.userType !== 'hospital' && (
            <>
              <div>
                <p><strong>DOB</strong></p>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </div>

              <div>
                <p><strong>Blood Group</strong></p>
                <select
                  id="bloodGroup"
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  disabled={!editMode}
                >
                  <option value="Select">{formData.bloodGroup}</option>
                    {bloodGroup.map((bg, i) => {
                      return <option key={i} value={bg}>{bg}</option>;
                    })}
                </select>
              </div>
              <div>
              <p><strong>Availability</strong></p>
              <select
              id="availability"
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              disabled={!editMode}
            >
              <option value='available'>available</option>
              <option value="unavailable">unavailable</option>
            </select>
              </div>
            </>
          )}
          <div>
            <p><strong>Email</strong></p>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!editMode}
            />
          </div>

          <div>
            <p><strong>Phone</strong></p>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={!editMode}
            />
          </div>

          {user.userType === 'hospital' && (
            <div>
            <p><strong>Availability</strong></p>
            <select
              id="availability"
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              disabled={!editMode}
            >
              <option value="Select">{formData.availability}</option>
                    {bloodGroup.map((bg, i) => {
                      return <option key={i} value={bg}>{bg}</option>;
                    })}
            </select>
          </div>
          )}

          {user.userType !== 'hospital' && (
            <div>
              <p><strong>Donations</strong></p>
              <input
                type="number"
                name="donations"
                value={formData.donations}
                onChange={handleChange}
                disabled={!editMode}
              />
            </div>
          )}

          <div>
            <p><strong>Country</strong></p>
            <select
              name="country"
              value={formData.country}
              onChange={handleCountryChangeAndUpdate}
              disabled={!editMode}
            >
              <option value="">{formData.country}</option>
              {countryNames.map((country, index) => (
                <option key={countryCodes[index]} value={countryCodes[index]}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          <div>
            <p><strong>State</strong></p>
            <select
              name="state"
              value={formData.state}
              onChange={handleStateChangeAndUpdate}
              disabled={!editMode || !formData.country}
            >
              <option value="">{formData.state}</option>
              {states[formData.country]?.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>

          <div>
            <p><strong>City</strong></p>
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              disabled={!editMode || !formData.state}
            >
              <option value="">{formData.city}</option>
              {city[formData.state]?.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
          <div className="edit-buttons">
            <button type="button" onClick={handleEditToggle} className="butn">
              {editMode ? 'Cancel' : 'Edit Profile'}
            </button>
            {editMode && (
              <button type="submit" className="btn btn-success">Save Changes</button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default Profile