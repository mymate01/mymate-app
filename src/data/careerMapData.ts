export interface CourseDetails {
  about?: string;
  duration?: string;
  fees?: string;
  subjects?: string[];
  exams?: string[];
  colleges?: string[];
}

export interface CareerNode {
  id: string;
  label: string;
  description?: string;
  details?: CourseDetails;
  children?: CareerNode[];
}

export const post10thCareerMap: CareerNode = {
  id: "10th",
  label: "10th Grade",
  description: "Your foundational step. Choose your path wisely!",
  details: {
    about: "The 10th grade (Secondary School Certificate) is a crucial milestone in the Indian education system. It serves as the foundation for choosing specialized streams in higher secondary education.",
    duration: "1 Year",
    subjects: ["Mathematics", "Science", "Social Studies", "Languages"],
    exams: ["State Board", "CBSE", "ICSE"]
  },
  children: [
    {
      id: "intermediate",
      label: "Intermediate (10+2)",
      description: "2-year pre-university courses",
      details: {
        about: "A two-year higher secondary education phase where students pick specialized streams (Science, Commerce, Arts) that dictate their future undergraduate options.",
        duration: "2 Years",
        fees: "₹10,000 - ₹1,50,000 per year",
      },
      children: [
        {
          id: "mpc",
          label: "MPC (Maths, Physics, Chem)",
          details: {
            about: "The MPC stream focuses heavily on analytical and mathematical skills, making it the primary gateway for engineering, architecture, and defense services.",
            duration: "2 Years",
            subjects: ["Mathematics", "Physics", "Chemistry", "English"],
            exams: ["JEE Main", "JEE Advanced", "BITSAT", "State CETs"],
            colleges: ["Sri Chaitanya", "Narayana", "Kendriya Vidyalaya", "DPS"]
          },
          children: [
            { 
              id: "btech", 
              label: "Engineering (B.Tech/B.E)",
              details: {
                about: "Bachelor of Technology/Engineering is a professional undergraduate degree awarded after completion of a four-year academic program in the field of engineering.",
                duration: "4 Years",
                fees: "₹1L - ₹4L per year",
                subjects: ["Computer Science", "Mechanical", "Electrical", "Civil", "Electronics"],
                exams: ["JEE Main", "JEE Advanced", "GATE (for PG)"],
                colleges: ["IITs", "NITs", "BITS Pilani", "IIITs", "Top State Colleges"]
              },
              children: [
                {
                  id: "mtech",
                  label: "M.Tech / M.E (Post Grad)",
                  description: "Master's degree in engineering specializations",
                  children: [
                    { id: "phd_eng", label: "Ph.D in Engineering", description: "Research & Academia" }
                  ]
                },
                {
                  id: "mba_eng",
                  label: "MBA (Management)",
                  description: "Master of Business Administration",
                  children: [
                    { id: "phd_mgmt", label: "Ph.D in Management", description: "Business Research & Academia" }
                  ]
                },
                {
                  id: "ms_eng",
                  label: "MS (Master of Science)",
                  description: "Higher education usually abroad",
                  children: [
                    { id: "phd_ms", label: "Ph.D (Global)", description: "Global Research & Innovations" }
                  ]
                },
                {
                  id: "job_eng",
                  label: "Direct Employment",
                  description: "IT, Core Engineering, PSUs, or UPSC"
                }
              ]
            },
            { id: "barch", label: "Architecture (B.Arch)" },
            { id: "nda", label: "NDA (Defense Services)" },
            { id: "bsc_maths", label: "B.Sc (Mathematics/Physics)" }
          ]
        },
        {
          id: "bipc",
          label: "BiPC (Bio, Physics, Chem)",
          children: [
            { 
              id: "mbbs", 
              label: "Medicine (MBBS)",
              children: [
                {
                  id: "md",
                  label: "MD (Doctor of Medicine)",
                  description: "General Medicine, Pediatrics, etc.",
                  children: [
                    { id: "dm", label: "DM (Super Specialization)", description: "Cardiology, Neurology, etc." }
                  ]
                },
                {
                  id: "ms_med",
                  label: "MS (Master of Surgery)",
                  description: "General Surgery, Orthopedics, etc.",
                  children: [
                    { id: "mch", label: "M.Ch (Super Specialization)", description: "Neurosurgery, Plastic Surgery, etc." }
                  ]
                },
                {
                  id: "diploma_med",
                  label: "PG Diploma",
                  description: "2-year clinical diplomas"
                }
              ]
            },
            { 
              id: "bds", 
              label: "Dentistry (BDS)", 
              children: [ 
                { id: "mds", label: "MDS (Master of Dental Surgery)" } 
              ] 
            },
            { id: "pharm", label: "Pharmacy (B.Pharm)" },
            { id: "agri", label: "Agriculture (B.Sc Agri)" },
            { id: "nursing", label: "Nursing (B.Sc Nursing)" }
          ]
        },
        {
          id: "cec",
          label: "CEC (Civics, Econ, Comm)",
          children: [
            { id: "bcom", label: "B.Com (Commerce)" },
            { id: "ca", label: "Chartered Accountancy (CA)" },
            { id: "bba", label: "BBA (Business Admin)" }
          ]
        },
        {
          id: "mec",
          label: "MEC (Maths, Econ, Comm)",
          children: [
            { id: "eco_honors", label: "Economics Honors" },
            { id: "finance", label: "Finance & Accounting" }
          ]
        },
        {
          id: "hec",
          label: "HEC (Arts & Humanities)",
          children: [
            { id: "ba", label: "Bachelor of Arts (BA)" },
            { id: "law", label: "Law (BA LLB)" },
            { id: "design", label: "Design & Fine Arts" }
          ]
        }
      ]
    },
    {
      id: "diploma",
      label: "Polytechnic Diploma",
      description: "3-year practical engineering courses",
      children: [
        { id: "mech_dip", label: "Mechanical Engineering" },
        { id: "civil_dip", label: "Civil Engineering" },
        { id: "comp_dip", label: "Computer Science" },
        { id: "ece_dip", label: "Electronics & Communication" }
      ]
    },
    {
      id: "iti",
      label: "ITI (Industrial Training)",
      description: "1-2 year technical certification courses",
      children: [
        { id: "electrician", label: "Electrician" },
        { id: "fitter", label: "Fitter" },
        { id: "mechanic", label: "Motor Mechanic" },
        { id: "welder", label: "Welder" }
      ]
    },
    {
      id: "paramedical",
      label: "Paramedical Courses",
      description: "Diploma in medical support services",
      children: [
        { id: "dmlt", label: "DMLT (Lab Tech)" },
        { id: "dmit", label: "Radiology Tech" },
        { id: "doa", label: "Ophthalmic Assistant" }
      ]
    },
    {
      id: "vocational",
      label: "Short-term Vocational",
      description: "Skill-based training programs",
      children: [
        { id: "tourism", label: "Travel & Tourism" },
        { id: "beauty", label: "Beauty & Wellness" },
        { id: "animation", label: "Animation & VFX" }
      ]
    }
  ]
};
