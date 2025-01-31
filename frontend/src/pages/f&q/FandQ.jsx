import React from 'react'
import './f&q.css'

const FandQ = () => {
  return (
    <div className='container fandq-container'>
      <div className="title-fandq">
        <p><strong>Know more about constraints and facts</strong></p>
      </div>
      <div class="accordion" id="accordionExample">
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">Who can Donate and can't Donate?</button>
          </h2>
          <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
          <div class="accordion-body">
            <p><strong>Should meet the constraints to Donate</strong></p>
            <ul>
              <li>Age should be between 18-60 years.</li>
              <li>Weight should be 45 kgs or more.</li>
              <li>Haemoglobin is 12.5 gm% minimum.</li>
              <li>Last blood donation was 3 months earlier.</li>
              <li>You haven't suffered from malaria, typhoid or other transmissible disease in the recent past.</li>
            </ul>
            <p><strong>Do not donate blood if you have any of the following</strong></p>
            <ul>
              <li>Cold or fever in the past 1 week.</li>
              <li>Under treatment with antibiotics or any other medication.</li>
              <li>Cardiac problems, hypertension, epilepsy, diabetes (on insulin therapy), history of cancer,chronic kidney or liver disease, bleeding tendencies, venereal disease etc.</li>
              <li>Major surgery in the last 6 months.</li>
              <li>Vaccination in the last 24 hours.</li>
              <li>Had fainting attacks during last donation.</li>
              <li>Have regularly received treatment with blood products.</li>
              <li>Shared a needle to inject drugs/ have history of drug addiction.</li>
              <li>Had sexual relations with different partners or with a high risk individual.</li>
              <li>Been tested positive for antibodies to HIV.</li>
            </ul>
            <p><strong>For Females, Do not donate if you have any of the following</strong></p>
            <ul>
              <li>Females should not donate blood during pregnancy.</li>
              <li>Females should not donate blood if they are having heavy menstrual flow or menstrual cramps.</li>
              <li>Had a miscarriage in the last 6 months or have been pregnant / lactating in the last one year.</li>
              <li><strong>Note: </strong>Can donate after 6 months following a normal delivery and when they are not breast feeding.</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">Facts about Blood Needs
          </button>
        </h2>
        <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
          <div class="accordion-body">
            <ul>
              <li>Every year our nation requires about 5 Crore units of blood, out of which only a meager 2.5 Crore units of blood are available.</li>
              <li>Every two seconds someone needs blood.</li>
              <li>More than 38,000 blood donations are needed every day.</li>
              <li>A total of 30 million blood components are transfused each year.</li>
              <li>The average red blood cell transfusion is approximately 3 pints.</li>
              <li>The blood type most often requested by hospitals is Type O.</li>
              <li>More than 1 million new people are diagnosed with cancer each year. Many of them will need blood, sometimes daily, during their chemotherapy treatment.</li>
              <li>A single car accident victim can require as many as 100 units of blood</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">Facts about Blood Supply</button>
        </h2>
        <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
          <div class="accordion-body">
            <ul>
              <li>Blood cannot be manufactured - it can only come from generous donors.</li>
              <li>Type O-negative blood (red cells) can be transfused to patients of all blood types. It is always in great demand and often in short supply.</li>
              <li>Type AB-positive plasma can be transfused to patients of all other blood types. AB plasma is also usually in short supply.</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="accordion-item last-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">Process of Blood Donation</button>
        </h2>
        <div id="collapseFour" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
          <div class="accordion-body">
            <ul>
              <li><strong>Registration:</strong> Fill out personal and medical information.</li>
              <li><strong>Health Screening:</strong> Check temperature, blood pressure, and hemoglobin levels.</li>
              <li><strong>Donation Process:</strong> Blood is collected through a needle in your arm.</li>
              <li><strong>Post-Donation Care:</strong> Rest, hydrate, and have a snack.</li>
              <li><strong>Recovery Time:</strong> Resume normal activities after a few hours.</li>
              <li><strong>Safety Considerations:</strong> Be at least 18 years old, healthy, and meet weight requirements.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default FandQ