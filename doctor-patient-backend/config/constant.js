const IDENTITY_PROOF=[
{name:"Aadhar Card",key:"aadharCard"},
{name:"Passport",key:"passport"},
{name:"PAN Card",key:"panCard"},
{name:"Election Comission Card",key:"electionComissionCard"},
{name:"Driving License",key:"drivingLicense"},
{name:"Ration Card",key:"rationCard"},
{name:"Voter Card",key:"voterCard"},
];

const TITLES=[
{name:"Dr",key:"dr"},
{name:"Mr",key:"mr"},
{name:"Mrs",key:"mrs"},
{name:"Ms",key:"ms"},
]

const DEGREE=[
{name:"MBBS",key:"mbbs"},
{name:"BDS",key:"bds"},
{name:"MD",key:"md"},
{name:"DVD",key:"dvd"},    
{name:"DDV",key:"ddv"},
{name:"DNB",key:"dnb"},
{name:"DGO",key:"dgo"},
{name:"MS",key:"ms"},
{name:"DM",key:"dm"}
]

const SPECIALITY=[
{name:"Obstetrics and Gynaecology",key:"obstetricsAndGynaecology"},
{name:"Psychiatry",key:"psychiatry"},
{name:"Dermatology",key:"dermatology"},
{name:"Ophthalmologist",key:"ophthalmologist"},    
{name:"Pharmacology",key:"pharmacology"},
{name:"Physician",key:"physician"},
{name:"Cardiology",key:"cardiology"},
{name:"Orthopaedics",key:"orthopaedics"},
{name:"General Physician",key:"generalPhysician"},
{name:"Ear, Nose and Throat",key:"earNoseAndThroat"},
{name:"Neurology",key:"neurology"}
]


const BLOOD_GROUP=[
{name:"A+",key:"a+"},
{name:"A-",key:"a-"},
{name:"B+",key:"b+"},
{name:"B-",key:"b-"},    
{name:"O+",key:"o+"},
{name:"O-",key:"o-"},
{name:"AB+",key:"ab+"},
{name:"AB-",key:"ab-"}
]


const COMMON_SYMPTOMS=[
{name:"fever",key:"generalPhysician",image:"fever.png"},
{name:"cold",key:"generalPhysician",image:"cold.jpeg"},
{name:"heart",key:"cardiology",image:"heart.jpeg"},
{name:"bones",key:"orthopaedics",image:"bones.png"},    
{name:"pregnancy",key:"obstetricsAndGynaecology",image:"preganacy.jpeg"},
{name:"brain",key:"neurology",image:"brain.png"},
{name:"skin",key:"dermatology",image:"skin.png"},
{name:"hair",key:"dermatology",image:"hair.png"},
{name:"eyes",key:"ophthalmologist",image:"eyes.jpg"}
]

const COLLEGES=[
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
]

const VISTING_SLOTS=[
"10:00","10:30","11:00","11:30","12:00","01:00","01:30","05:30"
]



 


module.exports ={
    IDENTITY_PROOF,
    TITLES,
    DEGREE,
    SPECIALITY,
    BLOOD_GROUP,
    COMMON_SYMPTOMS,
    COLLEGES,
    VISTING_SLOTS
}
 