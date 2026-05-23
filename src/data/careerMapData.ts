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
            exams: ["JEE Main", "JEE Advanced", "BITSAT", "State CETs"]
          },
          children: [
            { 
              id: "btech", 
              label: "Engineering (B.Tech/B.E)",
              details: { duration: "4 Years", exams: ["JEE Main", "JEE Advanced"] },
              children: [
                {
                  id: "mtech", label: "M.Tech / M.E (Post Grad)",
                  children: [{ id: "phd_eng", label: "Ph.D in Engineering" }]
                },
                {
                  id: "mba_eng", label: "MBA (Management)",
                  children: [{ id: "phd_mgmt", label: "Ph.D in Management" }]
                },
                { id: "job_eng", label: "Direct Employment (IT, Core)" }
              ]
            },
            { 
              id: "barch", 
              label: "Architecture (B.Arch)",
              details: { duration: "5 Years", exams: ["NATA", "JEE Main Paper 2"] },
              children: [
                { id: "march", label: "M.Arch", children: [{ id: "phd_arch", label: "Ph.D in Architecture" }] },
                { id: "job_arch", label: "Architectural Practice" }
              ]
            },
            { 
              id: "nda", 
              label: "NDA (Defense Services)",
              details: { duration: "3 Years Academy + 1 Year Training", exams: ["NDA Exam"] },
              children: [
                { id: "army", label: "Indian Army (Lieutenant)" },
                { id: "navy", label: "Indian Navy (Sub-Lieutenant)" },
                { id: "airforce", label: "Indian Air Force (Flying Officer)" }
              ]
            },
            { 
              id: "bsc_maths", 
              label: "B.Sc (Mathematics/Physics)",
              children: [
                { id: "msc_maths", label: "M.Sc", children: [{ id: "phd_sci", label: "Ph.D in Science" }] },
                { id: "mca", label: "MCA (Computer Applications)" },
                { id: "bed_maths", label: "B.Ed (Teaching)" }
              ]
            }
          ]
        },
        {
          id: "bipc",
          label: "BiPC (Bio, Physics, Chem)",
          children: [
            { 
              id: "mbbs", 
              label: "Medicine (MBBS)",
              details: { duration: "5.5 Years", exams: ["NEET UG"] },
              children: [
                { id: "md", label: "MD (Doctor of Medicine)", children: [{ id: "dm", label: "DM (Super Specialization)" }] },
                { id: "ms_med", label: "MS (Master of Surgery)", children: [{ id: "mch", label: "M.Ch (Super Specialization)" }] }
              ]
            },
            { 
              id: "bds", 
              label: "Dentistry (BDS)", 
              children: [ { id: "mds", label: "MDS (Master of Dental Surgery)", children: [{ id: "phd_dent", label: "Ph.D in Dentistry" }] } ] 
            },
            { 
              id: "pharm", 
              label: "Pharmacy (B.Pharm)",
              children: [
                { id: "mpharm", label: "M.Pharm", children: [{ id: "phd_pharm", label: "Ph.D in Pharmacy" }] },
                { id: "pharmd", label: "Pharm.D (Doctor of Pharmacy)" }
              ]
            },
            { 
              id: "agri", 
              label: "Agriculture (B.Sc Agri)",
              children: [ { id: "msc_agri", label: "M.Sc Agriculture", children: [{ id: "phd_agri", label: "Ph.D in Agriculture" }] } ]
            },
            { 
              id: "nursing", 
              label: "Nursing (B.Sc Nursing)",
              children: [ { id: "msc_nursing", label: "M.Sc Nursing", children: [{ id: "phd_nursing", label: "Ph.D in Nursing" }] } ]
            }
          ]
        },
        {
          id: "cec",
          label: "CEC (Civics, Econ, Comm)",
          children: [
            { 
              id: "bcom", 
              label: "B.Com (Commerce)",
              children: [
                { id: "mcom", label: "M.Com", children: [{ id: "phd_com", label: "Ph.D in Commerce" }] },
                { id: "mba_com", label: "MBA", children: [{ id: "phd_mgmt_com", label: "Ph.D in Management" }] }
              ]
            },
            { 
              id: "ca", 
              label: "Chartered Accountancy (CA)",
              children: [
                { id: "ca_practice", label: "Independent Practice" },
                { id: "ca_corp", label: "Corporate Finance/Audit" }
              ]
            },
            { 
              id: "bba", 
              label: "BBA (Business Admin)",
              children: [ { id: "mba_bba", label: "MBA", children: [{ id: "phd_bus", label: "Ph.D in Business Admin" }] } ]
            }
          ]
        },
        {
          id: "hec",
          label: "HEC (Arts & Humanities)",
          children: [
            { 
              id: "ba", 
              label: "Bachelor of Arts (BA)",
              children: [ { id: "ma", label: "Master of Arts (MA)", children: [{ id: "phd_arts", label: "Ph.D in Arts/Humanities" }] } ]
            },
            { 
              id: "law", 
              label: "Law (BA LLB)",
              children: [ { id: "llm", label: "LLM (Master of Laws)", children: [{ id: "lld", label: "LLD (Doctor of Laws) / Judiciary" }] } ]
            },
            { 
              id: "design", 
              label: "Design & Fine Arts (B.Des/BFA)",
              children: [ { id: "mdes", label: "M.Des / MFA", children: [{ id: "phd_design", label: "Ph.D in Design" }] } ]
            }
          ]
        }
      ]
    },
    {
      id: "diploma",
      label: "Polytechnic Diploma",
      description: "3-year practical engineering courses",
      children: [
        { 
          id: "mech_dip", 
          label: "Mechanical / Civil / CS / ECE",
          children: [ 
            { id: "btech_lat", label: "B.Tech (Lateral Entry)", children: [{ id: "mtech_lat", label: "M.Tech", children: [{id: "phd_lat", label: "Ph.D"}]}] },
            { id: "dip_jobs", label: "Junior Engineer (Govt/Private)" }
          ]
        }
      ]
    },
    {
      id: "paramedical",
      label: "Paramedical Courses",
      description: "Diploma in medical support services",
      children: [
        { 
          id: "dmlt", 
          label: "DMLT / Radiology / Ophthalmic",
          children: [
            { id: "bsc_paramed", label: "B.Sc Paramedical", children: [{ id: "msc_paramed", label: "M.Sc Paramedical", children: [{ id: "phd_paramed", label: "Ph.D"}] }] },
            { id: "paramed_jobs", label: "Clinical / Hospital Technician" }
          ]
        }
      ]
    }
  ]
};
