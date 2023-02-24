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
{name:"General Medicine",key:"generalMedicine"},
{name:"Pathology",key:"pathology"},    
{name:"Pharmacology",key:"pharmacology"},
{name:"Physician",key:"physician"},
{name:"Cardiology",key:"cardiology"},
{name:"Orthopaedics",key:"orthopaedics"},
{name:"General Physician",key:"generalPhysician"},
{name:"Ear, Nose and Throat",key:"earNoseAndThroat"}
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
{name:"fever",key:"generalPhysician"},
{name:"cold",key:"generalPhysician"},
{name:"heart",key:"cardiology"},
//{name:"B-",key:"b-"},    
//{name:"O+",key:"o+"},
//{name:"O-",key:"o-"},
//{name:"AB+",key:"ab+"},
//{name:"AB-",key:"ab-"}
]

 


module.exports ={
    IDENTITY_PROOF,
    TITLES,
    DEGREE,
    SPECIALITY,
    BLOOD_GROUP,
    COMMON_SYMPTOMS

}
 