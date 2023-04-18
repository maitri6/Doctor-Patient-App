const IDENTITY_PROOF = [
  { name: "Aadhar Card", key: "aadharCard" },
  { name: "Passport", key: "passport" },
  { name: "PAN Card", key: "panCard" },
  { name: "Election Comission Card", key: "electionComissionCard" },
  { name: "Driving License", key: "drivingLicense" },
  { name: "Ration Card", key: "rationCard" },
  { name: "Voter Card", key: "voterCard" },
];

const TITLES = [
  { name: "Dr", key: "dr" },
  { name: "Mr", key: "mr" },
  { name: "Mrs", key: "mrs" },
  { name: "Ms", key: "ms" },
];

const DEGREE = [
  { name: "MBBS", key: "mbbs" },
  { name: "BDS", key: "bds" },
  { name: "MD", key: "md" },
  { name: "DVD", key: "dvd" },
  { name: "DDV", key: "ddv" },
  { name: "DNB", key: "dnb" },
  { name: "DGO", key: "dgo" },
  { name: "MS", key: "ms" },
  { name: "DM", key: "dm" },
];

const SPECIALITY = [
  { name: "Obstetrics and Gynaecology", key: "obstetricsAndGynaecology" },
  { name: "Psychiatry", key: "psychiatry" },
  { name: "Dermatology", key: "dermatology" },
  { name: "Ophthalmologist", key: "ophthalmologist" },
  { name: "Pharmacology", key: "pharmacology" },
  // {name:"Physician",key:"physician"},
  { name: "Cardiology", key: "cardiology" },
  { name: "Orthopaedics", key: "orthopaedics" },
  { name: "General Physician", key: "generalPhysician" },
  { name: "Ear, Nose and Throat", key: "earNoseAndThroat" },
  { name: "Neurology", key: "neurology" },
  { name: "Dentist", key: "dentist" },
  { name: "Paediatrician", key: "paediatrician" },
];

const BLOOD_GROUP = [
  { name: "A+", key: "a+" },
  { name: "A-", key: "a-" },
  { name: "B+", key: "b+" },
  { name: "B-", key: "b-" },
  { name: "O+", key: "o+" },
  { name: "O-", key: "o-" },
  { name: "AB+", key: "ab+" },
  { name: "AB-", key: "ab-" },
];

const COMMON_SYMPTOMS = [
  { name: "Fever", key: "generalPhysician", image: "fever.png" },
  { name: "Cold", key: "generalPhysician", image: "cold.jpeg" },
  { name: "Heart", key: "cardiology", image: "heart.jpeg" },
  { name: "Bones", key: "orthopaedics", image: "bones.png" },
  {
    name: "Pregnancy",
    key: "obstetricsAndGynaecology",
    image: "pregnancy.jpeg",
  },
  { name: "Brain", key: "neurology", image: "brain.png" },
  { name: "Skin", key: "dermatology", image: "skin.png" },
  { name: "Hair", key: "dermatology", image: "hair.png" },
  { name: "Eyes", key: "ophthalmologist", image: "eyes.jpg" },
  { name: "Ear", key: "otolaryngologist", image: "ear.jpeg" },
  { name: "Nose", key: "otolaryngologist", image: "nose.jpeg" },
  { name: "Teeth", key: "dentist", image: "teeth.png" },
  //{name:"Child",key:"paediatrician",image:"child.jpeg"}
];

const COLLEGES = [
  "All India Institute of Medical Sciences (AIIMS), New Delhi",
  "Christian Medical College (CMC), Vellore",
  "Armed Forces Medical College (AFMC), Pune",
  "Maulana Azad Medical College (MAMC), New Delhi",
  "Kasturba Medical College (KMC), Manipal",
  "Grant Medical College, Mumbai",
  "JIPMER (Jawaharlal Institute of Postgraduate Medical Education and Research), Puducherry",
  "Lady Hardinge Medical College (LHMC), New Delhi",
  "Madras Medical College (MMC), Chennai",
  "St. John's Medical College, Bangalore",
];

const VISTING_SLOTS = [
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
  "05:30 PM",
  "06:00 PM",
];

module.exports = {
  IDENTITY_PROOF,
  TITLES,
  DEGREE,
  SPECIALITY,
  BLOOD_GROUP,
  COMMON_SYMPTOMS,
  COLLEGES,
  VISTING_SLOTS,
};
