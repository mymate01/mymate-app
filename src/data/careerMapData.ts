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
      description: "2-year pre-university courses in various streams",
      details: {
        about: "A two-year higher secondary education phase where students pick specialized streams (Science, Commerce, Arts) that dictate their future undergraduate options.",
        duration: "2 Years",
        fees: "₹10,000 - ₹1,50,000 per year",
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
            exams: ["JEE Main", "JEE Advanced", "BITSAT", "State CETs"]
          },
          children: [
            { 
              id: "btech", 
              label: "Engineering (B.Tech/B.E)",
              description: "4-year professional engineering degree",
              details: { duration: "4 Years", exams: ["JEE Main", "JEE Advanced"] },
              children: [
                {
                  id: "mtech", label: "M.Tech / M.E (Post Grad)",
                  description: "Master's specialization in engineering",
                  children: [{ id: "phd_eng", label: "Ph.D in Engineering", description: "Doctoral research in core technology" }]
                },
                {
                  id: "mba_eng", label: "MBA (Management)",
                  description: "Business administration for tech grads",
                  children: [{ id: "phd_mgmt", label: "Ph.D in Management", description: "Research in business practices" }]
                },
                { id: "job_eng", label: "Direct Employment (IT, Core)", description: "Start working in tech or core industries immediately" }
              ]
            },
            { 
              id: "barch", 
              label: "Architecture (B.Arch)",
              description: "5-year degree in structural design and architecture",
              details: { duration: "5 Years", exams: ["NATA", "JEE Main Paper 2"] },
              children: [
                { id: "march", label: "M.Arch", description: "Master of Architecture", children: [{ id: "phd_arch", label: "Ph.D in Architecture", description: "Doctorate in architectural theory and design" }] },
                { id: "job_arch", label: "Architectural Practice", description: "Work as a licensed architect" }
              ]
            },
            { 
              id: "nda", 
              label: "NDA (Defense Services)",
              description: "National Defense Academy entry for armed forces",
              details: { duration: "3 Years Academy + 1 Year Training", exams: ["NDA Exam"] },
              children: [
                { id: "army", label: "Indian Army (Lieutenant)", description: "Serve as a commissioned officer in the Army" },
                { id: "navy", label: "Indian Navy (Sub-Lieutenant)", description: "Serve as a commissioned officer in the Navy" },
                { id: "airforce", label: "Indian Air Force (Flying Officer)", description: "Serve as a commissioned officer in the Air Force" }
              ]
            },
            { 
              id: "bsc_maths", 
              label: "B.Sc (Mathematics/Physics)",
              description: "3-year bachelor's degree in pure sciences",
              children: [
                { id: "msc_maths", label: "M.Sc", description: "Master of Science in specialization", children: [{ id: "phd_sci", label: "Ph.D in Science", description: "Doctoral research in pure science" }] },
                { id: "mca", label: "MCA (Computer Applications)", description: "Master of Computer Applications for IT roles" },
                { id: "bed_maths", label: "B.Ed (Teaching)", description: "Bachelor of Education for teaching profession" }
              ]
            }
          ]
        },
        {
          id: "bipc",
          label: "BiPC (Bio, Physics, Chem)",
          description: "Gateway to medical, pharmacy, and life sciences",
          children: [
            { 
              id: "mbbs", 
              label: "Medicine (MBBS)",
              description: "5.5-year degree to become a medical doctor",
              details: { duration: "5.5 Years", exams: ["NEET UG"] },
              children: [
                { id: "md", label: "MD (Doctor of Medicine)", description: "PG in general medicine, pediatrics, etc.", children: [{ id: "dm", label: "DM (Super Specialization)", description: "Cardiology, Neurology, etc." }] },
                { id: "ms_med", label: "MS (Master of Surgery)", description: "PG in surgical fields", children: [{ id: "mch", label: "M.Ch (Super Specialization)", description: "Neurosurgery, Plastic Surgery, etc." }] }
              ]
            },
            { 
              id: "bds", 
              label: "Dentistry (BDS)", 
              description: "5-year degree to become a dentist",
              children: [ { id: "mds", label: "MDS (Master of Dental Surgery)", description: "Postgraduate dental specialization", children: [{ id: "phd_dent", label: "Ph.D in Dentistry", description: "Doctoral research in dental sciences" }] } ] 
            },
            { 
              id: "pharm", 
              label: "Pharmacy (B.Pharm)",
              description: "4-year degree in pharmaceutical sciences",
              children: [
                { id: "mpharm", label: "M.Pharm", description: "Master's in Pharmacy", children: [{ id: "phd_pharm", label: "Ph.D in Pharmacy", description: "Research in drug development" }] },
                { id: "pharmd", label: "Pharm.D (Doctor of Pharmacy)", description: "6-year integrated doctorate in pharmacy" }
              ]
            },
            { 
              id: "agri", 
              label: "Agriculture (B.Sc Agri)",
              description: "4-year degree in agricultural science",
              children: [ { id: "msc_agri", label: "M.Sc Agriculture", description: "Master's in agricultural specialization", children: [{ id: "phd_agri", label: "Ph.D in Agriculture", description: "Doctoral research in agriculture" }] } ]
            },
            { 
              id: "nursing", 
              label: "Nursing (B.Sc Nursing)",
              description: "4-year degree in nursing and healthcare",
              children: [ { id: "msc_nursing", label: "M.Sc Nursing", description: "Postgraduate nursing specialization", children: [{ id: "phd_nursing", label: "Ph.D in Nursing", description: "Advanced research in clinical nursing" }] } ]
            }
          ]
        },
        {
          id: "cec",
          label: "CEC (Civics, Econ, Comm)",
          description: "Gateway to commerce, finance, and accounting",
          children: [
            { 
              id: "bcom", 
              label: "B.Com (Commerce)",
              description: "3-year bachelor's degree in commerce",
              children: [
                { id: "mcom", label: "M.Com", description: "Master's degree in commerce", children: [{ id: "phd_com", label: "Ph.D in Commerce", description: "Doctorate in commerce and trade" }] },
                { id: "mba_com", label: "MBA", description: "Master of Business Administration", children: [{ id: "phd_mgmt_com", label: "Ph.D in Management", description: "Doctoral research in business" }] }
              ]
            },
            { 
              id: "ca", 
              label: "Chartered Accountancy (CA)",
              description: "Professional certification in accounting and finance",
              children: [
                { id: "ca_practice", label: "Independent Practice", description: "Start your own CA firm" },
                { id: "ca_corp", label: "Corporate Finance/Audit", description: "Work in corporate finance and auditing" }
              ]
            },
            { 
              id: "bba", 
              label: "BBA (Business Admin)",
              description: "3-year bachelor's degree in business management",
              children: [ { id: "mba_bba", label: "MBA", description: "Master of Business Administration", children: [{ id: "phd_bus", label: "Ph.D in Business Admin", description: "Doctorate in management studies" }] } ]
            }
          ]
        },
        {
          id: "hec",
          label: "HEC (Arts & Humanities)",
          description: "Gateway to arts, humanities, law, and design",
          children: [
            { 
              id: "ba", 
              label: "Bachelor of Arts (BA)",
              description: "3-year degree in arts and humanities",
              children: [ { id: "ma", label: "Master of Arts (MA)", description: "Master's specialization in arts", children: [{ id: "phd_arts", label: "Ph.D in Arts/Humanities", description: "Doctoral research in humanities" }] } ]
            },
            { 
              id: "law", 
              label: "Law (BA LLB)",
              description: "5-year integrated law degree",
              children: [ { id: "llm", label: "LLM (Master of Laws)", description: "Postgraduate degree in law", children: [{ id: "lld", label: "LLD (Doctor of Laws) / Judiciary", description: "Doctorate in law or judicial services" }] } ]
            },
            { 
              id: "design", 
              label: "Design & Fine Arts (B.Des/BFA)",
              description: "4-year degree in design and fine arts",
              children: [ { id: "mdes", label: "M.Des / MFA", description: "Master's degree in design or fine arts", children: [{ id: "phd_design", label: "Ph.D in Design", description: "Doctoral research in design methodologies" }] } ]
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
          id: "mech_dip", label: "Mechanical Engineering", description: "Core engineering diploma in mechanics",
          children: [ 
            { id: "btech_lat_mech", label: "B.Tech (Lateral Entry)", description: "Direct admission to 2nd year B.Tech", children: [{ id: "mtech_lat_mech", label: "M.Tech", description: "Master of Technology", children: [{id: "phd_lat_mech", label: "Ph.D", description: "Doctorate in engineering"}]}] },
            { id: "dip_jobs_mech", label: "Junior Engineer", description: "Employment as a mechanical diploma engineer" }
          ]
        },
        {
          id: "civil_dip", label: "Civil Engineering", description: "Core engineering diploma in construction",
          children: [ 
            { id: "btech_lat_civil", label: "B.Tech (Lateral Entry)", description: "Direct admission to 2nd year B.Tech", children: [{ id: "mtech_lat_civil", label: "M.Tech", description: "Master of Technology", children: [{id: "phd_lat_civil", label: "Ph.D", description: "Doctorate in civil engineering"}]}] },
            { id: "dip_jobs_civil", label: "Junior Engineer", description: "Employment as a civil diploma engineer" }
          ]
        },
        {
          id: "cs_dip", label: "Computer Science", description: "Engineering diploma in software",
          children: [ 
            { id: "btech_lat_cs", label: "B.Tech (Lateral Entry)", description: "Direct admission to 2nd year B.Tech", children: [{ id: "mtech_lat_cs", label: "M.Tech", description: "Master of Technology", children: [{id: "phd_lat_cs", label: "Ph.D", description: "Doctorate in computer science"}]}] },
            { id: "dip_jobs_cs", label: "Junior Software Engineer", description: "Employment as a software diploma engineer" }
          ]
        },
        {
          id: "ece_dip", label: "Electronics & Communication", description: "Engineering diploma in electronics",
          children: [ 
            { id: "btech_lat_ece", label: "B.Tech (Lateral Entry)", description: "Direct admission to 2nd year B.Tech", children: [{ id: "mtech_lat_ece", label: "M.Tech", description: "Master of Technology", children: [{id: "phd_lat_ece", label: "Ph.D", description: "Doctorate in electronics"}]}] },
            { id: "dip_jobs_ece", label: "Junior Electronics Engineer", description: "Employment as an electronics diploma engineer" }
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
          label: "DMLT",
          description: "Diploma in Medical Laboratory Technology",
          children: [
            { id: "bsc_paramed_dmlt", label: "B.Sc Paramedical", description: "Bachelor's degree in allied health", children: [{ id: "msc_paramed_dmlt", label: "M.Sc Paramedical", description: "Master's degree in allied health", children: [{ id: "phd_paramed_dmlt", label: "Ph.D", description: "Doctorate in clinical research"}] }] },
            { id: "paramed_jobs_dmlt", label: "Lab Technician", description: "Employment in hospitals and diagnostic labs" }
          ]
        },
        { 
          id: "radiology", 
          label: "Radiology",
          description: "Diploma in Radiology and Imaging Technology",
          children: [
            { id: "bsc_paramed_rad", label: "B.Sc Radiology", description: "Bachelor's degree in allied health", children: [{ id: "msc_paramed_rad", label: "M.Sc Radiology", description: "Master's degree in allied health", children: [{ id: "phd_paramed_rad", label: "Ph.D", description: "Doctorate in clinical research"}] }] },
            { id: "paramed_jobs_rad", label: "Radiology Technician", description: "Employment in hospitals and diagnostic labs" }
          ]
        },
        { 
          id: "ophthalmic", 
          label: "Ophthalmic",
          description: "Diploma in Ophthalmic Technology",
          children: [
            { id: "bsc_paramed_oph", label: "B.Sc Optometry", description: "Bachelor's degree in allied health", children: [{ id: "msc_paramed_oph", label: "M.Sc Optometry", description: "Master's degree in allied health", children: [{ id: "phd_paramed_oph", label: "Ph.D", description: "Doctorate in clinical research"}] }] },
            { id: "paramed_jobs_oph", label: "Ophthalmic Technician", description: "Employment in hospitals and eye clinics" }
          ]
        }
      ]
    }
  ]
};
