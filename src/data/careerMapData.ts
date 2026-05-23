export interface CourseDetails {
  about?: string;
  duration?: string;
  fees?: string;
  subjects?: string[];
  exams?: string[];
  colleges?: string[];
  jobs?: string[];
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
    exams: ["State Board", "CBSE", "ICSE"],
    jobs: ["Constable (Police)", "Clerk", "Peon/Office Attendant", "Data Entry Operator", "Postman", "Defense (Soldier)"]
  },
  children: [
    {
      id: "intermediate",
      label: "Intermediate (10+2)",
      description: "2-year pre-university courses in various streams",
      details: {
        about: "A two-year higher secondary education phase where students pick specialized streams (Science, Commerce, Arts) that dictate their future undergraduate options.",
        duration: "2 Years",
        fees: "₹10,000 - ₹1,50,000 per year",
        jobs: ["Call Center Executive", "Lower Division Clerk (LDC)", "Data Entry Operator", "Armed Forces (NDA)", "Railway Ticket Collector"]
      },
      children: [
        {
          id: "mpc",
          label: "MPC (Maths, Physics, Chem)",
          description: "Gateway to engineering, tech, and architecture",
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
              description: "4-year professional engineering degree",
              details: { 
                about: "Bachelor of Technology is an undergraduate academic degree conferred after completion of a four-year program of studies at an accredited university.",
                duration: "4 Years", 
                fees: "₹1L - ₹4L per year",
                subjects: ["Computer Science", "Mechanical", "Electrical", "Civil"],
                exams: ["JEE Main", "JEE Advanced", "State CETs"],
                colleges: ["IITs", "NITs", "BITS Pilani", "IIITs"]
              },
              children: [
                {
                  id: "mtech", label: "M.Tech / M.E",
                  description: "Master's specialization in engineering",
                  details: { duration: "2 Years", fees: "₹1L - ₹2.5L per year", exams: ["GATE"], subjects: ["Advanced Specializations"], colleges: ["IITs", "NITs", "IISc"] },
                  children: [{ 
                    id: "phd_eng", label: "Ph.D in Engineering", 
                    description: "Doctoral research in core technology",
                    details: { duration: "3-5 Years", about: "Advanced research leading to academic or high-level R&D positions." }
                  }]
                },
                {
                  id: "mba_eng", label: "MBA (Management)",
                  description: "Business administration for tech grads",
                  details: { duration: "2 Years", exams: ["CAT", "XAT", "GMAT"], colleges: ["IIMs", "ISB", "FMS"] },
                  children: [{ 
                    id: "phd_mgmt", label: "Ph.D in Management", 
                    description: "Research in business practices",
                    details: { duration: "3-5 Years", about: "Academic research in finance, marketing, or operations." }
                  }]
                },
                { 
                  id: "job_eng", label: "Direct Employment", 
                  description: "Start working in tech or core industries immediately",
                  details: { about: "Enter the workforce as a Software Developer, Systems Engineer, or Core Field Engineer. Salary ranges widely based on college tier." }
                }
              ]
            },
            { 
              id: "barch", 
              label: "Architecture (B.Arch)",
              description: "5-year degree in structural design and architecture",
              details: { 
                about: "A professional degree focusing on the design, planning, and construction of buildings and structures.",
                duration: "5 Years", fees: "₹1L - ₹3L per year", exams: ["NATA", "JEE Main Paper 2"], colleges: ["SPAs", "CEPT", "IIT Roorkee", "NIT Trichy"] 
              },
              children: [
                { 
                  id: "march", label: "M.Arch", 
                  description: "Master of Architecture", 
                  details: { duration: "2 Years", exams: ["CEED", "GATE"], subjects: ["Urban Design", "Landscape"] },
                  children: [{ 
                    id: "phd_arch", label: "Ph.D in Architecture", 
                    description: "Doctorate in architectural theory and design",
                    details: { duration: "3-5 Years", about: "Research focusing on sustainable design, urban planning, or architectural history." }
                  }] 
                },
                { 
                  id: "job_arch", label: "Architectural Practice", 
                  description: "Work as a licensed architect",
                  details: { about: "Join an architecture firm, start independent practice, or work with real estate developers." }
                }
              ]
            },
            { 
              id: "nda", 
              label: "NDA (Defense Services)",
              description: "National Defense Academy entry for armed forces",
              details: { 
                about: "Joint Services academy of the Indian Armed Forces, where cadets of the three services train together before pre-commissioning training.",
                duration: "3 Years Academy + 1 Year Training", fees: "Govt Funded", exams: ["NDA Exam", "SSB Interview"], colleges: ["National Defence Academy, Pune"] 
              },
              children: [
                { id: "army", label: "Indian Army (Lieutenant)", description: "Serve as a commissioned officer in the Army", details: { about: "Join the combat, artillery, or engineering units of the Indian Army." } },
                { id: "navy", label: "Indian Navy (Sub-Lieutenant)", description: "Serve as a commissioned officer in the Navy", details: { about: "Serve on warships, submarines, or naval aviation." } },
                { id: "airforce", label: "Indian Air Force (Flying Officer)", description: "Serve as a commissioned officer in the Air Force", details: { about: "Pilot fighter jets, transport aircraft, or manage ground control." } }
              ]
            },
            { 
              id: "bsc_maths", 
              label: "B.Sc (Mathematics/Physics)",
              description: "3-year bachelor's degree in pure sciences",
              details: { duration: "3 Years", fees: "₹20K - ₹1L per year", subjects: ["Mathematics", "Physics", "Statistics", "Computer Science"], exams: ["CUET", "State University Exams"] },
              children: [
                { 
                  id: "msc_maths", label: "M.Sc", 
                  description: "Master of Science in specialization", 
                  details: { duration: "2 Years", exams: ["JAM"] },
                  children: [{ 
                    id: "phd_sci", label: "Ph.D in Science", 
                    description: "Doctoral research in pure science",
                    details: { duration: "3-5 Years", about: "Advanced academic research in pure mathematics, theoretical physics, or applied sciences." }
                  }] 
                },
                { 
                  id: "mca", label: "MCA (Computer Applications)", 
                  description: "Master of Computer Applications for IT roles",
                  details: { duration: "2 Years", exams: ["NIMCET", "State CETs"], colleges: ["NITs", "Top State Univs"] }
                },
                { 
                  id: "bed_maths", label: "B.Ed (Teaching)", 
                  description: "Bachelor of Education for teaching profession",
                  details: { duration: "2 Years", about: "Mandatory qualification for teaching in middle and high schools in India." }
                }
              ]
            }
          ]
        },
        {
          id: "bipc",
          label: "BiPC (Bio, Physics, Chem)",
          description: "Gateway to medical, pharmacy, and life sciences",
          details: {
            about: "The core stream for aspiring medical professionals, researchers in biological sciences, and pharmacologists.",
            duration: "2 Years", subjects: ["Biology", "Physics", "Chemistry", "English"], exams: ["NEET UG", "State Agriculture/Pharmacy CETs"]
          },
          children: [
            { 
              id: "mbbs", 
              label: "Medicine (MBBS)",
              description: "5.5-year degree to become a medical doctor",
              details: { duration: "5.5 Years (includes 1 year internship)", fees: "₹1L - ₹20L per year", exams: ["NEET UG"], colleges: ["AIIMS", "JIPMER", "CMC Vellore", "AFMC", "Govt Medical Colleges"] },
              children: [
                { 
                  id: "md", label: "MD (Doctor of Medicine)", 
                  description: "PG in general medicine, pediatrics, etc.", 
                  details: { duration: "3 Years", exams: ["NEET PG", "INI CET"] },
                  children: [{ 
                    id: "dm", label: "DM (Super Specialization)", 
                    description: "Cardiology, Neurology, etc.",
                    details: { duration: "3 Years", exams: ["NEET SS"] }
                  }] 
                },
                { 
                  id: "ms_med", label: "MS (Master of Surgery)", 
                  description: "PG in surgical fields", 
                  details: { duration: "3 Years", exams: ["NEET PG", "INI CET"] },
                  children: [{ 
                    id: "mch", label: "M.Ch (Super Specialization)", 
                    description: "Neurosurgery, Plastic Surgery, etc.",
                    details: { duration: "3 Years", exams: ["NEET SS"] }
                  }] 
                }
              ]
            },
            { 
              id: "bds", 
              label: "Dentistry (BDS)", 
              description: "5-year degree to become a dentist",
              details: { duration: "5 Years", fees: "₹1L - ₹10L per year", exams: ["NEET UG"], colleges: ["Maulana Azad Institute", "Manipal College of Dental Sciences"] },
              children: [ 
                { 
                  id: "mds", label: "MDS (Master of Dental Surgery)", 
                  description: "Postgraduate dental specialization", 
                  details: { duration: "3 Years", exams: ["NEET MDS"] },
                  children: [{ 
                    id: "phd_dent", label: "Ph.D in Dentistry", 
                    description: "Doctoral research in dental sciences",
                    details: { duration: "3-5 Years" }
                  }] 
                } 
              ] 
            },
            { 
              id: "pharm", 
              label: "Pharmacy (B.Pharm)",
              description: "4-year degree in pharmaceutical sciences",
              details: { duration: "4 Years", fees: "₹50K - ₹2L per year", exams: ["State CETs", "BITSAT", "PU CET"], colleges: ["Jamia Hamdard", "Panjab University", "NIPER", "BITS Pilani"] },
              children: [
                { 
                  id: "mpharm", label: "M.Pharm", 
                  description: "Master's in Pharmacy", 
                  details: { duration: "2 Years", exams: ["GPAT"] },
                  children: [{ 
                    id: "phd_pharm", label: "Ph.D in Pharmacy", 
                    description: "Research in drug development",
                    details: { duration: "3-5 Years", about: "Research in novel drug delivery, pharmacology, or clinical pharmacy." }
                  }] 
                },
                { 
                  id: "pharmd", label: "Pharm.D (Doctor of Pharmacy)", 
                  description: "6-year integrated doctorate in pharmacy",
                  details: { duration: "6 Years", about: "A professional doctorate focused on clinical pharmacy and patient care." }
                }
              ]
            },
            { 
              id: "agri", 
              label: "Agriculture (B.Sc Agri)",
              description: "4-year degree in agricultural science",
              details: { duration: "4 Years", exams: ["ICAR AIEEA", "State Agri CETs"], colleges: ["IARI", "NDRI", "TNAU", "GBPUAT"] },
              children: [ 
                { 
                  id: "msc_agri", label: "M.Sc Agriculture", 
                  description: "Master's in agricultural specialization", 
                  details: { duration: "2 Years", exams: ["ICAR AIEEA PG"] },
                  children: [{ 
                    id: "phd_agri", label: "Ph.D in Agriculture", 
                    description: "Doctoral research in agriculture",
                    details: { duration: "3-5 Years", about: "Research in genetics, plant breeding, soil science, or agronomy." }
                  }] 
                } 
              ]
            },
            { 
              id: "nursing", 
              label: "Nursing (B.Sc Nursing)",
              description: "4-year degree in nursing and healthcare",
              details: { duration: "4 Years", exams: ["AIIMS Nursing", "State Nursing Exams"], colleges: ["AIIMS", "CMC Vellore", "AFMC Pune"] },
              children: [ 
                { 
                  id: "msc_nursing", label: "M.Sc Nursing", 
                  description: "Postgraduate nursing specialization", 
                  details: { duration: "2 Years" },
                  children: [{ 
                    id: "phd_nursing", label: "Ph.D in Nursing", 
                    description: "Advanced research in clinical nursing",
                    details: { duration: "3-5 Years" }
                  }] 
                } 
              ]
            }
          ]
        },
        {
          id: "cec",
          label: "CEC (Civics, Econ, Comm)",
          description: "Gateway to commerce, finance, and accounting",
          details: { duration: "2 Years", subjects: ["Commerce", "Economics", "Civics/Accounts", "English"], exams: ["CA Foundation", "CUET"] },
          children: [
            { 
              id: "bcom", 
              label: "B.Com (Commerce)",
              description: "3-year bachelor's degree in commerce",
              details: { duration: "3 Years", exams: ["CUET", "University Exams"], colleges: ["SRCC", "Hindu College", "St. Xavier's", "Loyola College"] },
              children: [
                { 
                  id: "mcom", label: "M.Com", 
                  description: "Master's degree in commerce", 
                  details: { duration: "2 Years" },
                  children: [{ 
                    id: "phd_com", label: "Ph.D in Commerce", 
                    description: "Doctorate in commerce and trade",
                    details: { duration: "3-5 Years" }
                  }] 
                },
                { 
                  id: "mba_com", label: "MBA", 
                  description: "Master of Business Administration", 
                  details: { duration: "2 Years", exams: ["CAT", "XAT", "MAT"] },
                  children: [{ 
                    id: "phd_mgmt_com", label: "Ph.D in Management", 
                    description: "Doctoral research in business",
                    details: { duration: "3-5 Years" }
                  }] 
                }
              ]
            },
            { 
              id: "ca", 
              label: "Chartered Accountancy (CA)",
              description: "Professional certification in accounting and finance",
              details: { duration: "4-5 Years", exams: ["CA Foundation", "CA Intermediate", "CA Final"], subjects: ["Accounting", "Taxation", "Law", "Audit"], colleges: ["ICAI (Institute body)"] },
              children: [
                { id: "ca_practice", label: "Independent Practice", description: "Start your own CA firm", details: { about: "Work independently as a certified auditor and tax consultant." } },
                { id: "ca_corp", label: "Corporate Finance/Audit", description: "Work in corporate finance and auditing", details: { about: "Join Big 4 (Deloitte, PwC, EY, KPMG) or corporate finance teams." } }
              ]
            },
            { 
              id: "bba", 
              label: "BBA (Business Admin)",
              description: "3-year bachelor's degree in business management",
              details: { duration: "3 Years", exams: ["CUET", "IPMAT", "NPAT", "SET"], colleges: ["IIM Indore (IPM)", "NMIMS", "Symbiosis", "Christ University"] },
              children: [ 
                { 
                  id: "mba_bba", label: "MBA", 
                  description: "Master of Business Administration", 
                  details: { duration: "2 Years", exams: ["CAT"] },
                  children: [{ 
                    id: "phd_bus", label: "Ph.D in Business Admin", 
                    description: "Doctorate in management studies",
                    details: { duration: "3-5 Years" }
                  }] 
                } 
              ]
            }
          ]
        },
        {
          id: "hec",
          label: "HEC (Arts & Humanities)",
          description: "Gateway to arts, humanities, law, and design",
          details: { duration: "2 Years", subjects: ["History", "Economics", "Civics", "Languages"], exams: ["CUET", "CLAT (for Law)", "NID DAT (for Design)"] },
          children: [
            { 
              id: "ba", 
              label: "Bachelor of Arts (BA)",
              description: "3-year degree in arts and humanities",
              details: { duration: "3 Years", exams: ["CUET"], colleges: ["St. Stephen's", "LSR", "Hindu College", "Madras Christian College"] },
              children: [ 
                { 
                  id: "ma", label: "Master of Arts (MA)", 
                  description: "Master's specialization in arts", 
                  details: { duration: "2 Years" },
                  children: [{ 
                    id: "phd_arts", label: "Ph.D in Arts/Humanities", 
                    description: "Doctoral research in humanities",
                    details: { duration: "3-5 Years" }
                  }] 
                } 
              ]
            },
            { 
              id: "law", 
              label: "Law (BA LLB)",
              description: "5-year integrated law degree",
              details: { duration: "5 Years", exams: ["CLAT", "AILET", "LSAT India"], colleges: ["NLSIU Bangalore", "NLU Delhi", "NALSAR", "Symbiosis Law School"] },
              children: [ 
                { 
                  id: "llm", label: "LLM (Master of Laws)", 
                  description: "Postgraduate degree in law", 
                  details: { duration: "1-2 Years", exams: ["CLAT PG"] },
                  children: [{ 
                    id: "lld", label: "LLD (Doctor of Laws) / Judiciary", 
                    description: "Doctorate in law or judicial services",
                    details: { about: "Clear Judiciary Exams to become a judge, or pursue LLD for academia." }
                  }] 
                } 
              ]
            },
            { 
              id: "design", 
              label: "Design & Fine Arts (B.Des/BFA)",
              description: "4-year degree in design and fine arts",
              details: { duration: "4 Years", exams: ["NID DAT", "UCEED", "NIFT Entrance"], colleges: ["NID", "NIFT", "IIT Bombay (IDC)", "Srishti"] },
              children: [ 
                { 
                  id: "mdes", label: "M.Des / MFA", 
                  description: "Master's degree in design or fine arts", 
                  details: { duration: "2 Years", exams: ["CEED"] },
                  children: [{ 
                    id: "phd_design", label: "Ph.D in Design", 
                    description: "Doctoral research in design methodologies",
                    details: { duration: "3-5 Years" }
                  }] 
                } 
              ]
            }
          ]
        }
      ]
    },
    {
      id: "diploma",
      label: "Polytechnic Diploma",
      description: "3-year practical engineering courses",
      details: { duration: "3 Years", fees: "₹10K - ₹50K per year", exams: ["State Polytechnic Entrance (POLYCET)"], about: "A practice-oriented diploma that equips students with core technical skills." },
      children: [
        {
          id: "mech_dip", label: "Mechanical Engineering", description: "Core engineering diploma in mechanics",
          details: { duration: "3 Years" },
          children: [ 
            { 
              id: "btech_lat_mech", label: "B.Tech (Lateral Entry)", description: "Direct admission to 2nd year B.Tech", 
              details: { duration: "3 Years", exams: ["State Lateral Entry CET"] },
              children: [{ 
                id: "mtech_lat_mech", label: "M.Tech", description: "Master of Technology", 
                details: { duration: "2 Years", exams: ["GATE"] },
                children: [{id: "phd_lat_mech", label: "Ph.D", description: "Doctorate in engineering", details: { duration: "3-5 Years" }}]
              }] 
            },
            { id: "dip_jobs_mech", label: "Junior Engineer", description: "Employment as a mechanical diploma engineer", details: { about: "Work in manufacturing, automotive, or heavy machinery industries." } }
          ]
        },
        {
          id: "civil_dip", label: "Civil Engineering", description: "Core engineering diploma in construction",
          details: { duration: "3 Years" },
          children: [ 
            { 
              id: "btech_lat_civil", label: "B.Tech (Lateral Entry)", description: "Direct admission to 2nd year B.Tech", 
              details: { duration: "3 Years", exams: ["State Lateral Entry CET"] },
              children: [{ 
                id: "mtech_lat_civil", label: "M.Tech", description: "Master of Technology", 
                details: { duration: "2 Years", exams: ["GATE"] },
                children: [{id: "phd_lat_civil", label: "Ph.D", description: "Doctorate in civil engineering", details: { duration: "3-5 Years" }}]
              }] 
            },
            { id: "dip_jobs_civil", label: "Junior Engineer", description: "Employment as a civil diploma engineer", details: { about: "Work in construction, public works, and surveying." } }
          ]
        },
        {
          id: "cs_dip", label: "Computer Science", description: "Engineering diploma in software",
          details: { duration: "3 Years" },
          children: [ 
            { 
              id: "btech_lat_cs", label: "B.Tech (Lateral Entry)", description: "Direct admission to 2nd year B.Tech", 
              details: { duration: "3 Years", exams: ["State Lateral Entry CET"] },
              children: [{ 
                id: "mtech_lat_cs", label: "M.Tech", description: "Master of Technology", 
                details: { duration: "2 Years", exams: ["GATE"] },
                children: [{id: "phd_lat_cs", label: "Ph.D", description: "Doctorate in computer science", details: { duration: "3-5 Years" }}]
              }] 
            },
            { id: "dip_jobs_cs", label: "Junior Software Engineer", description: "Employment as a software diploma engineer", details: { about: "Work in IT services, web development, and tech support." } }
          ]
        },
        {
          id: "ece_dip", label: "Electronics & Communication", description: "Engineering diploma in electronics",
          details: { duration: "3 Years" },
          children: [ 
            { 
              id: "btech_lat_ece", label: "B.Tech (Lateral Entry)", description: "Direct admission to 2nd year B.Tech", 
              details: { duration: "3 Years", exams: ["State Lateral Entry CET"] },
              children: [{ 
                id: "mtech_lat_ece", label: "M.Tech", description: "Master of Technology", 
                details: { duration: "2 Years", exams: ["GATE"] },
                children: [{id: "phd_lat_ece", label: "Ph.D", description: "Doctorate in electronics", details: { duration: "3-5 Years" }}]
              }] 
            },
            { id: "dip_jobs_ece", label: "Junior Electronics Engineer", description: "Employment as an electronics diploma engineer", details: { about: "Work in telecommunications, IoT, and hardware manufacturing." } }
          ]
        }
      ]
    },
    {
      id: "paramedical",
      label: "Paramedical Courses",
      description: "Diploma in medical support services",
      details: { duration: "2-3 Years", about: "Allied healthcare courses that form the backbone of the medical diagnostic and support system.", exams: ["State Paramedical Board Exams"] },
      children: [
        { 
          id: "dmlt", 
          label: "DMLT",
          description: "Diploma in Medical Laboratory Technology",
          details: { duration: "2 Years" },
          children: [
            { 
              id: "bsc_paramed_dmlt", label: "B.Sc Paramedical", description: "Bachelor's degree in allied health", 
              details: { duration: "3 Years" },
              children: [{ 
                id: "msc_paramed_dmlt", label: "M.Sc Paramedical", description: "Master's degree in allied health", 
                details: { duration: "2 Years" },
                children: [{ id: "phd_paramed_dmlt", label: "Ph.D", description: "Doctorate in clinical research", details: { duration: "3-5 Years" }}] 
              }] 
            },
            { id: "paramed_jobs_dmlt", label: "Lab Technician", description: "Employment in hospitals and diagnostic labs", details: { about: "Run diagnostic tests, manage blood banks, and analyze samples." } }
          ]
        },
        { 
          id: "radiology", 
          label: "Radiology",
          description: "Diploma in Radiology and Imaging Technology",
          details: { duration: "2 Years" },
          children: [
            { 
              id: "bsc_paramed_rad", label: "B.Sc Radiology", description: "Bachelor's degree in allied health", 
              details: { duration: "3 Years" },
              children: [{ 
                id: "msc_paramed_rad", label: "M.Sc Radiology", description: "Master's degree in allied health", 
                details: { duration: "2 Years" },
                children: [{ id: "phd_paramed_rad", label: "Ph.D", description: "Doctorate in clinical research", details: { duration: "3-5 Years" }}] 
              }] 
            },
            { id: "paramed_jobs_rad", label: "Radiology Technician", description: "Employment in hospitals and diagnostic labs", details: { about: "Operate X-Ray, MRI, and CT scan machines." } }
          ]
        },
        { 
          id: "ophthalmic", 
          label: "Ophthalmic",
          description: "Diploma in Ophthalmic Technology",
          details: { duration: "2 Years" },
          children: [
            { 
              id: "bsc_paramed_oph", label: "B.Sc Optometry", description: "Bachelor's degree in allied health", 
              details: { duration: "3 Years" },
              children: [{ 
                id: "msc_paramed_oph", label: "M.Sc Optometry", description: "Master's degree in allied health", 
                details: { duration: "2 Years" },
                children: [{ id: "phd_paramed_oph", label: "Ph.D", description: "Doctorate in clinical research", details: { duration: "3-5 Years" }}] 
              }] 
            },
            { id: "paramed_jobs_oph", label: "Ophthalmic Technician", description: "Employment in hospitals and eye clinics", details: { about: "Assist ophthalmologists and perform vision tests." } }
          ]
        }
      ]
    },
    {
      id: "vocational",
      label: "Short-term Vocational",
      description: "Skill-based training and certification programs",
      details: { about: "Job-ready courses aimed at specific industries like tourism, hospitality, and animation.", duration: "6 Months - 2 Years" },
      children: [
        {
          id: "tourism", label: "Travel & Tourism", description: "Diploma in Travel and Hospitality",
          details: { duration: "1 Year" },
          children: [
            { 
              id: "bvoc_tourism", label: "B.Voc (Tourism)", description: "Bachelor of Vocation", 
              details: { duration: "3 Years" },
              children: [{ id: "mvoc_tourism", label: "M.Voc / MBA", description: "Master's in Tourism/Hospitality", details: { duration: "2 Years" } }] 
            },
            { id: "job_tourism", label: "Hospitality Professional", description: "Work in hotels, airlines, or travel agencies" }
          ]
        },
        {
          id: "beauty", label: "Beauty & Wellness", description: "Diploma in Cosmetology",
          details: { duration: "6 Months - 1 Year" },
          children: [
            { 
              id: "bvoc_beauty", label: "B.Voc (Beauty)", description: "Bachelor of Vocation", 
              details: { duration: "3 Years" },
              children: [{ id: "mvoc_beauty", label: "M.Voc", description: "Master of Vocation", details: { duration: "2 Years" } }] 
            },
            { id: "job_beauty", label: "Cosmetologist / Stylist", description: "Work in premium salons or start a business" }
          ]
        },
        {
          id: "animation", label: "Animation & VFX", description: "Diploma in Multimedia",
          details: { duration: "1-2 Years", exams: ["Institute specific exams"], colleges: ["Arena Animation", "MAAC"] },
          children: [
            { 
              id: "bsc_animation", label: "B.Sc / B.Voc (Animation)", description: "Bachelor's degree in VFX/Animation", 
              details: { duration: "3 Years" },
              children: [{ id: "msc_animation", label: "M.Sc Animation", description: "Master's degree", details: { duration: "2 Years" } }] 
            },
            { id: "job_animation", label: "VFX Artist / Animator", description: "Work in film, gaming, or advertising industries" }
          ]
        }
      ]
    }
  ]
};
