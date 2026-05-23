export interface ReservationInfo {
  category: string;
  quota: string;
  relaxation?: string;
}

export interface EligibilityInfo {
  minMarks?: string;
  minMarksReserved?: string;
  ageLimit?: string;
  eligibility?: string;
  reservation?: ReservationInfo[];
}

export interface CourseDetails {
  about?: string;
  duration?: string;
  fees?: string;
  subjects?: string[];
  exams?: string[];
  colleges?: string[];
  jobs?: string[];
  eligibility?: EligibilityInfo;
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
  description: "Your foundational step. Choose your path wisely!. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
  details: {
    about: "The 10th grade (Secondary School Certificate) is a crucial milestone in the Indian education system. It serves as the foundation for choosing specialized streams in higher secondary education.",
    duration: "1 Year",
    subjects: [
      "Mathematics",
      "Science",
      "Social Studies",
      "Languages"
    ],
    exams: [
      "State Board",
      "CBSE",
      "ICSE"
    ],
    jobs: [
      "Constable (Police)",
      "Clerk",
      "Peon/Office Attendant",
      "Data Entry Operator",
      "Postman",
      "Defense (Soldier)"
    ],
    fees: "₹50,000 - ₹3,000,000 per year",
    colleges: [
      "Top Tier National Institutes",
      "Premium State Universities",
      "Reputed Private Colleges"
    ]
  },
  children: [
    {
      id: "intermediate",
      label: "Intermediate (10+2)",
      description: "2-year pre-university courses in various streams. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
      details: {
        about: "A two-year higher secondary education phase where students pick specialized streams (Science, Commerce, Arts) that dictate their future undergraduate options.",
        duration: "2 Years",
        fees: "₹10,000 - ₹1,50,000 per year",
        jobs: [
          "Call Center Executive",
          "Lower Division Clerk (LDC)",
          "Data Entry Operator",
          "Armed Forces (NDA)",
          "Railway Ticket Collector"
        ],
        subjects: [
          "Core Theory",
          "Advanced Practicals",
          "Industry Case Studies",
          "Research Methodology"
        ],
        exams: [
          "National Level Entrance",
          "State CET",
          "University Specific Exams"
        ],
        colleges: [
          "Top Tier National Institutes",
          "Premium State Universities",
          "Reputed Private Colleges"
        ]
      },
      children: [
        {
          id: "mpc",
          label: "MPC (Maths, Physics, Chem)",
          description: "Gateway to engineering, tech, and architecture. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
          details: {
            about: "The MPC stream focuses heavily on analytical and mathematical skills, making it the primary gateway for engineering, architecture, and defense services.",
            duration: "2 Years",
            subjects: [
              "Mathematics",
              "Physics",
              "Chemistry",
              "English"
            ],
            exams: [
              "JEE Main",
              "JEE Advanced",
              "BITSAT",
              "State CETs"
            ],
            colleges: [
              "Sri Chaitanya",
              "Narayana",
              "Kendriya Vidyalaya",
              "DPS"
            ],
            fees: "₹50,000 - ₹3,000,000 per year",
            jobs: [
              "Engineer",
              "Scientist",
              "Architect",
              "Defense Officer"
            ]
          },
          children: [
            {
              id: "btech",
              label: "Engineering (B.Tech/B.E)",
              description: "4-year professional engineering degree. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
              details: {
                about: "Bachelor of Technology is an undergraduate academic degree conferred after completion of a four-year program of studies at an accredited university.",
                duration: "4 Years",
                fees: "₹1L - ₹4L per year",
                subjects: [
                  "Computer Science",
                  "Mechanical",
                  "Electrical",
                  "Civil"
                ],
                exams: [
                  "JEE Main",
                  "JEE Advanced",
                  "State CETs"
                ],
                colleges: [
                  "IITs",
                  "NITs",
                  "BITS Pilani",
                  "IIITs"
                ],
                jobs: [
                  "Software Engineer",
                  "Mechanical Engineer",
                  "Civil Engineer",
                  "Electronics Engineer"
                ]
              },
              children: [
                {
                  id: "mtech",
                  label: "M.Tech / M.E",
                  description: "Master's specialization in engineering. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
                  details: {
                    duration: "2 Years",
                    fees: "₹1L - ₹2.5L per year",
                    exams: [
                      "GATE"
                    ],
                    subjects: [
                      "Advanced Specializations"
                    ],
                    colleges: [
                      "IITs",
                      "NITs",
                      "IISc"
                    ],
                    about: "This is a comprehensive program focused on M.Tech / M.E. It prepares students for advanced careers and deep academic understanding in the field.",
                    jobs: [
                      "Senior Engineer",
                      "R&D Engineer",
                      "Technical Lead",
                      "Design Engineer"
                    ]
                  },
                  children: [
                    {
                      id: "phd_eng",
                      label: "Ph.D in Engineering",
                      description: "Doctoral research in core technology. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
                      details: {
                        duration: "3-5 Years",
                        about: "Advanced research leading to academic or high-level R&D positions.",
                        fees: "Funded / ₹50K - ₹2L per year",
                        subjects: [
                          "Core Theory",
                          "Advanced Practicals",
                          "Industry Case Studies",
                          "Research Methodology"
                        ],
                        exams: [
                          "UGC NET",
                          "CSIR NET",
                          "Institute Specific Entrance"
                        ],
                        colleges: [
                          "Top Tier National Institutes",
                          "Premium State Universities",
                          "Reputed Private Colleges"
                        ],
                        jobs: [
                          "Engineering Professor",
                          "Principal Scientist",
                          "Research Director",
                          "CTO"
                        ]
                      }
                    }
                  ]
                },
                {
                  id: "mba_eng",
                  label: "MBA (Management)",
                  description: "Business administration for tech grads. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
                  details: {
                    duration: "2 Years",
                    exams: [
                      "CAT",
                      "XAT",
                      "GMAT"
                    ],
                    colleges: [
                      "IIMs",
                      "ISB",
                      "FMS"
                    ],
                    about: "This is a comprehensive program focused on MBA (Management). It prepares students for advanced careers and deep academic understanding in the field.",
                    fees: "₹50,000 - ₹3,000,000 per year",
                    subjects: [
                      "Core Theory",
                      "Advanced Practicals",
                      "Industry Case Studies",
                      "Research Methodology"
                    ],
                    jobs: [
                      "Business Analyst",
                      "Product Manager",
                      "Management Consultant",
                      "Operations Manager"
                    ]
                  },
                  children: [
                    {
                      id: "phd_mgmt",
                      label: "Ph.D in Management",
                      description: "Research in business practices. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
                      details: {
                        duration: "3-5 Years",
                        about: "Academic research in finance, marketing, or operations.",
                        fees: "Funded / ₹50K - ₹2L per year",
                        subjects: [
                          "Core Theory",
                          "Advanced Practicals",
                          "Industry Case Studies",
                          "Research Methodology"
                        ],
                        exams: [
                          "UGC NET",
                          "CSIR NET",
                          "Institute Specific Entrance"
                        ],
                        colleges: [
                          "Top Tier National Institutes",
                          "Premium State Universities",
                          "Reputed Private Colleges"
                        ],
                        jobs: [
                          "Management Professor",
                          "Strategy Consultant",
                          "Dean of Business School",
                          "Policy Researcher"
                        ]
                      }
                    }
                  ]
                },
                {
                  id: "job_eng",
                  label: "Direct Employment",
                  description: "Start working in tech or core industries immediately. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
                  details: {
                    about: "Enter the workforce as a Software Developer, Systems Engineer, or Core Field Engineer. Salary ranges widely based on college tier.",
                    duration: "3-4 Years",
                    fees: "N/A",
                    jobs: [
                      "Junior Engineer (PSU)",
                      "Technical Assistant",
                      "Lab Technician",
                      "Field Engineer"
                    ]
                  }
                }
              ]
            },
            {
              id: "barch",
              label: "Architecture (B.Arch)",
              description: "5-year degree in structural design and architecture. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
              details: {
                about: "A professional degree focusing on the design, planning, and construction of buildings and structures.",
                duration: "5 Years",
                fees: "₹1L - ₹3L per year",
                exams: [
                  "NATA",
                  "JEE Main Paper 2"
                ],
                colleges: [
                  "SPAs",
                  "CEPT",
                  "IIT Roorkee",
                  "NIT Trichy"
                ],
                subjects: [
                  "Core Theory",
                  "Advanced Practicals",
                  "Industry Case Studies",
                  "Research Methodology"
                ],
                jobs: [
                  "Architect",
                  "Interior Designer",
                  "Urban Planner",
                  "Landscape Architect"
                ]
              },
              children: [
                {
                  id: "march",
                  label: "M.Arch",
                  description: "Master of Architecture. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
                  details: {
                    duration: "2 Years",
                    exams: [
                      "CEED",
                      "GATE"
                    ],
                    subjects: [
                      "Urban Design",
                      "Landscape"
                    ],
                    about: "This is a comprehensive program focused on M.Arch. It prepares students for advanced careers and deep academic understanding in the field.",
                    fees: "₹50,000 - ₹3,000,000 per year",
                    colleges: [
                      "Top Tier National Institutes",
                      "Premium State Universities",
                      "Reputed Private Colleges"
                    ],
                    jobs: [
                      "Senior Architect",
                      "Conservation Architect",
                      "Sustainable Design Specialist",
                      "Urban Design Consultant"
                    ]
                  },
                  children: [
                    {
                      id: "phd_arch",
                      label: "Ph.D in Architecture",
                      description: "Doctorate in architectural theory and design. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
                      details: {
                        duration: "3-5 Years",
                        about: "Research focusing on sustainable design, urban planning, or architectural history.",
                        fees: "Funded / ₹50K - ₹2L per year",
                        subjects: [
                          "Core Theory",
                          "Advanced Practicals",
                          "Industry Case Studies",
                          "Research Methodology"
                        ],
                        exams: [
                          "UGC NET",
                          "CSIR NET",
                          "Institute Specific Entrance"
                        ],
                        colleges: [
                          "Top Tier National Institutes",
                          "Premium State Universities",
                          "Reputed Private Colleges"
                        ],
                        jobs: [
                          "Architecture Professor",
                          "Heritage Conservation Expert",
                          "Research Fellow",
                          "Design Think Tank Lead"
                        ]
                      }
                    }
                  ]
                },
                {
                  id: "job_arch",
                  label: "Architectural Practice",
                  description: "Work as a licensed architect. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
                  details: {
                    about: "Join an architecture firm, start independent practice, or work with real estate developers.",
                    duration: "3-4 Years",
                    fees: "N/A",
                    jobs: [
                      "Licensed Architect",
                      "Project Manager (Construction)",
                      "Real Estate Consultant",
                      "Town Planning Officer"
                    ]
                  }
                }
              ]
            },
            {
              id: "nda",
              label: "NDA (Defense Services)",
              description: "National Defense Academy entry for armed forces. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
              details: {
                about: "Joint Services academy of the Indian Armed Forces, where cadets of the three services train together before pre-commissioning training.",
                duration: "3 Years Academy + 1 Year Training",
                fees: "Govt Funded",
                exams: [
                  "NDA Exam",
                  "SSB Interview"
                ],
                colleges: [
                  "National Defence Academy, Pune"
                ],
                subjects: [
                  "Core Theory",
                  "Advanced Practicals",
                  "Industry Case Studies",
                  "Research Methodology"
                ],
                jobs: [
                  "Army Officer (Lieutenant)",
                  "Navy Officer (Sub-Lt)",
                  "Air Force Officer (Fg Off)",
                  "Defense Analyst"
                ]
              },
              children: [
                {
                  id: "army",
                  label: "Indian Army (Lieutenant)",
                  description: "Serve as a commissioned officer in the Army. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
                  details: {
                    about: "Join the combat, artillery, or engineering units of the Indian Army.",
                    duration: "3-4 Years",
                    fees: "₹50,000 - ₹3,000,000 per year",
                    subjects: [
                      "Core Theory",
                      "Advanced Practicals",
                      "Industry Case Studies",
                      "Research Methodology"
                    ],
                    exams: [
                      "National Level Entrance",
                      "State CET",
                      "University Specific Exams"
                    ],
                    colleges: [
                      "Top Tier National Institutes",
                      "Premium State Universities",
                      "Reputed Private Colleges"
                    ],
                    jobs: [
                      "Captain",
                      "Major",
                      "Colonel",
                      "Brigadier"
                    ]
                  }
                },
                {
                  id: "navy",
                  label: "Indian Navy (Sub-Lieutenant)",
                  description: "Serve as a commissioned officer in the Navy. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
                  details: {
                    about: "Serve on warships, submarines, or naval aviation.",
                    duration: "3-4 Years",
                    fees: "₹50,000 - ₹3,000,000 per year",
                    subjects: [
                      "Core Theory",
                      "Advanced Practicals",
                      "Industry Case Studies",
                      "Research Methodology"
                    ],
                    exams: [
                      "National Level Entrance",
                      "State CET",
                      "University Specific Exams"
                    ],
                    colleges: [
                      "Top Tier National Institutes",
                      "Premium State Universities",
                      "Reputed Private Colleges"
                    ],
                    jobs: [
                      "Lieutenant",
                      "Lt Commander",
                      "Commander",
                      "Captain (Navy)"
                    ]
                  }
                },
                {
                  id: "airforce",
                  label: "Indian Air Force (Flying Officer)",
                  description: "Serve as a commissioned officer in the Air Force. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
                  details: {
                    about: "Pilot fighter jets, transport aircraft, or manage ground control.",
                    duration: "3-4 Years",
                    fees: "₹50,000 - ₹3,000,000 per year",
                    subjects: [
                      "Core Theory",
                      "Advanced Practicals",
                      "Industry Case Studies",
                      "Research Methodology"
                    ],
                    exams: [
                      "National Level Entrance",
                      "State CET",
                      "University Specific Exams"
                    ],
                    colleges: [
                      "Top Tier National Institutes",
                      "Premium State Universities",
                      "Reputed Private Colleges"
                    ],
                    jobs: [
                      "Flight Lieutenant",
                      "Squadron Leader",
                      "Wing Commander",
                      "Group Captain"
                    ]
                  }
                }
              ]
            },
            {
              id: "bsc_maths",
              label: "B.Sc (Mathematics/Physics)",
              description: "3-year bachelor's degree in pure sciences. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
              details: {
                duration: "3 Years",
                fees: "₹20K - ₹1L per year",
                subjects: [
                  "Mathematics",
                  "Physics",
                  "Statistics",
                  "Computer Science"
                ],
                exams: [
                  "CUET",
                  "State University Exams"
                ],
                about: "This is a comprehensive program focused on B.Sc (Mathematics/Physics). It prepares students for advanced careers and deep academic understanding in the field.",
                colleges: [
                  "Top Tier National Institutes",
                  "Premium State Universities",
                  "Reputed Private Colleges"
                ],
                jobs: [
                  "Data Analyst",
                  "Lab Researcher",
                  "Statistical Analyst",
                  "Science Educator"
                ]
              },
              children: [
                {
                  id: "msc_maths",
                  label: "M.Sc",
                  description: "Master of Science in specialization. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
                  details: {
                    duration: "2 Years",
                    exams: [
                      "JAM"
                    ],
                    about: "This is a comprehensive program focused on M.Sc. It prepares students for advanced careers and deep academic understanding in the field.",
                    fees: "₹50,000 - ₹3,000,000 per year",
                    subjects: [
                      "Core Theory",
                      "Advanced Practicals",
                      "Industry Case Studies",
                      "Research Methodology"
                    ],
                    colleges: [
                      "Top Tier National Institutes",
                      "Premium State Universities",
                      "Reputed Private Colleges"
                    ],
                    jobs: [
                      "Research Scientist",
                      "Data Scientist",
                      "Quality Analyst",
                      "Scientific Officer"
                    ]
                  },
                  children: [
                    {
                      id: "phd_sci",
                      label: "Ph.D in Science",
                      description: "Doctoral research in pure science. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
                      details: {
                        duration: "3-5 Years",
                        about: "Advanced academic research in pure mathematics, theoretical physics, or applied sciences.",
                        fees: "Funded / ₹50K - ₹2L per year",
                        subjects: [
                          "Core Theory",
                          "Advanced Practicals",
                          "Industry Case Studies",
                          "Research Methodology"
                        ],
                        exams: [
                          "UGC NET",
                          "CSIR NET",
                          "Institute Specific Entrance"
                        ],
                        colleges: [
                          "Top Tier National Institutes",
                          "Premium State Universities",
                          "Reputed Private Colleges"
                        ],
                        jobs: [
                          "University Professor",
                          "Principal Investigator",
                          "ISRO/DRDO Scientist",
                          "Research Director"
                        ]
                      }
                    }
                  ]
                },
                {
                  id: "mca",
                  label: "MCA (Computer Applications)",
                  description: "Master of Computer Applications for IT roles. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
                  details: {
                    duration: "2 Years",
                    exams: [
                      "NIMCET",
                      "State CETs"
                    ],
                    colleges: [
                      "NITs",
                      "Top State Univs"
                    ],
                    about: "This is a comprehensive program focused on MCA (Computer Applications). It prepares students for advanced careers and deep academic understanding in the field.",
                    fees: "₹50,000 - ₹3,000,000 per year",
                    subjects: [
                      "Core Theory",
                      "Advanced Practicals",
                      "Industry Case Studies",
                      "Research Methodology"
                    ],
                    jobs: [
                      "Software Developer",
                      "Full-Stack Developer",
                      "Systems Analyst",
                      "Database Administrator"
                    ]
                  }
                },
                {
                  id: "bed_maths",
                  label: "B.Ed (Teaching)",
                  description: "Bachelor of Education for teaching profession. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
                  details: {
                    duration: "2 Years",
                    about: "Mandatory qualification for teaching in middle and high schools in India.",
                    fees: "₹50,000 - ₹3,000,000 per year",
                    subjects: [
                      "Core Theory",
                      "Advanced Practicals",
                      "Industry Case Studies",
                      "Research Methodology"
                    ],
                    exams: [
                      "National Level Entrance",
                      "State CET",
                      "University Specific Exams"
                    ],
                    colleges: [
                      "Top Tier National Institutes",
                      "Premium State Universities",
                      "Reputed Private Colleges"
                    ],
                    jobs: [
                      "School Teacher (TGT)",
                      "PGT Teacher",
                      "Education Coordinator",
                      "Curriculum Developer"
                    ]
                  }
                }
              ]
            }
          ]
        },
        {
          id: "bipc",
          label: "BiPC (Bio, Physics, Chem)",
          description: "Gateway to medical, pharmacy, and life sciences. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
          details: {
            about: "The core stream for aspiring medical professionals, researchers in biological sciences, and pharmacologists.",
            duration: "2 Years",
            subjects: [
              "Biology",
              "Physics",
              "Chemistry",
              "English"
            ],
            exams: [
              "NEET UG",
              "State Agriculture/Pharmacy CETs"
            ],
            fees: "₹50,000 - ₹3,000,000 per year",
            colleges: [
              "Top Tier National Institutes",
              "Premium State Universities",
              "Reputed Private Colleges"
            ],
            jobs: [
              "Doctor (MBBS)",
              "Pharmacist",
              "Nurse",
              "Agricultural Scientist"
            ]
          },
          children: [
            {
              id: "mbbs",
              label: "Medicine (MBBS)",
              description: "5.5-year degree to become a medical doctor. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
              details: {
                duration: "5.5 Years (includes 1 year internship)",
                fees: "₹1L - ₹20L per year",
                exams: [
                  "NEET UG"
                ],
                colleges: [
                  "AIIMS",
                  "JIPMER",
                  "CMC Vellore",
                  "AFMC",
                  "Govt Medical Colleges"
                ],
                about: "This is a comprehensive program focused on Medicine (MBBS). It prepares students for advanced careers and deep academic understanding in the field.",
                subjects: [
                  "Core Theory",
                  "Advanced Practicals",
                  "Industry Case Studies",
                  "Research Methodology"
                ],
                jobs: [
                  "General Physician",
                  "Medical Officer (Govt)",
                  "Clinical Research Associate",
                  "Emergency Medicine Doctor"
                ]
              },
              children: [
                {
                  id: "md",
                  label: "MD (Doctor of Medicine)",
                  description: "PG in general medicine, pediatrics, etc. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
                  details: {
                    duration: "3 Years",
                    exams: [
                      "NEET PG",
                      "INI CET"
                    ],
                    about: "This is a comprehensive program focused on MD (Doctor of Medicine). It prepares students for advanced careers and deep academic understanding in the field.",
                    fees: "₹50,000 - ₹3,000,000 per year",
                    subjects: [
                      "Core Theory",
                      "Advanced Practicals",
                      "Industry Case Studies",
                      "Research Methodology"
                    ],
                    colleges: [
                      "Top Tier National Institutes",
                      "Premium State Universities",
                      "Reputed Private Colleges"
                    ],
                    jobs: [
                      "Specialist Doctor",
                      "Cardiologist",
                      "Neurologist",
                      "Pulmonologist"
                    ]
                  },
                  children: [
                    {
                      id: "dm",
                      label: "DM (Super Specialization)",
                      description: "Cardiology, Neurology, etc. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
                      details: {
                        duration: "3 Years",
                        exams: [
                          "NEET SS"
                        ],
                        about: "This is a comprehensive program focused on DM (Super Specialization). It prepares students for advanced careers and deep academic understanding in the field.",
                        fees: "₹50,000 - ₹3,000,000 per year",
                        subjects: [
                          "Core Theory",
                          "Advanced Practicals",
                          "Industry Case Studies",
                          "Research Methodology"
                        ],
                        colleges: [
                          "Top Tier National Institutes",
                          "Premium State Universities",
                          "Reputed Private Colleges"
                        ],
                        jobs: [
                          "Super Specialist Consultant",
                          "Department Head",
                          "Medical Director",
                          "Interventional Cardiologist"
                        ]
                      }
                    }
                  ]
                },
                {
                  id: "ms_med",
                  label: "MS (Master of Surgery)",
                  description: "PG in surgical fields. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
                  details: {
                    duration: "3 Years",
                    exams: [
                      "NEET PG",
                      "INI CET"
                    ],
                    about: "This is a comprehensive program focused on MS (Master of Surgery). It prepares students for advanced careers and deep academic understanding in the field.",
                    fees: "₹50,000 - ₹3,000,000 per year",
                    subjects: [
                      "Core Theory",
                      "Advanced Practicals",
                      "Industry Case Studies",
                      "Research Methodology"
                    ],
                    colleges: [
                      "Top Tier National Institutes",
                      "Premium State Universities",
                      "Reputed Private Colleges"
                    ],
                    jobs: [
                      "General Surgeon",
                      "Orthopedic Surgeon",
                      "ENT Surgeon",
                      "Ophthalmic Surgeon"
                    ]
                  },
                  children: [
                    {
                      id: "mch",
                      label: "M.Ch (Super Specialization)",
                      description: "Neurosurgery, Plastic Surgery, etc. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
                      details: {
                        duration: "3 Years",
                        exams: [
                          "NEET SS"
                        ],
                        about: "This is a comprehensive program focused on M.Ch (Super Specialization). It prepares students for advanced careers and deep academic understanding in the field.",
                        fees: "₹50,000 - ₹3,000,000 per year",
                        subjects: [
                          "Core Theory",
                          "Advanced Practicals",
                          "Industry Case Studies",
                          "Research Methodology"
                        ],
                        colleges: [
                          "Top Tier National Institutes",
                          "Premium State Universities",
                          "Reputed Private Colleges"
                        ],
                        jobs: [
                          "Neurosurgeon",
                          "Cardiac Surgeon",
                          "Plastic Surgeon",
                          "Pediatric Surgeon"
                        ]
                      }
                    }
                  ]
                }
              ]
            },
            {
              id: "bds",
              label: "Dentistry (BDS)",
              description: "5-year degree to become a dentist. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
              details: {
                duration: "5 Years",
                fees: "₹1L - ₹10L per year",
                exams: [
                  "NEET UG"
                ],
                colleges: [
                  "Maulana Azad Institute",
                  "Manipal College of Dental Sciences"
                ],
                about: "This is a comprehensive program focused on Dentistry (BDS). It prepares students for advanced careers and deep academic understanding in the field.",
                subjects: [
                  "Core Theory",
                  "Advanced Practicals",
                  "Industry Case Studies",
                  "Research Methodology"
                ],
                jobs: [
                  "Dentist",
                  "Dental Surgeon",
                  "Orthodontist (after MDS)",
                  "Public Health Dentist"
                ]
              },
              children: [
                {
                  id: "mds",
                  label: "MDS (Master of Dental Surgery)",
                  description: "Postgraduate dental specialization. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
                  details: {
                    duration: "3 Years",
                    exams: [
                      "NEET MDS"
                    ],
                    about: "This is a comprehensive program focused on MDS (Master of Dental Surgery). It prepares students for advanced careers and deep academic understanding in the field.",
                    fees: "₹50,000 - ₹3,000,000 per year",
                    subjects: [
                      "Core Theory",
                      "Advanced Practicals",
                      "Industry Case Studies",
                      "Research Methodology"
                    ],
                    colleges: [
                      "Top Tier National Institutes",
                      "Premium State Universities",
                      "Reputed Private Colleges"
                    ],
                    jobs: [
                      "Oral Surgeon",
                      "Prosthodontist",
                      "Periodontist",
                      "Endodontist"
                    ]
                  },
                  children: [
                    {
                      id: "phd_dent",
                      label: "Ph.D in Dentistry",
                      description: "Doctoral research in dental sciences. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
                      details: {
                        duration: "3-5 Years",
                        about: "This is a comprehensive program focused on Ph.D in Dentistry. It prepares students for advanced careers and deep academic understanding in the field.",
                        fees: "Funded / ₹50K - ₹2L per year",
                        subjects: [
                          "Core Theory",
                          "Advanced Practicals",
                          "Industry Case Studies",
                          "Research Methodology"
                        ],
                        exams: [
                          "UGC NET",
                          "CSIR NET",
                          "Institute Specific Entrance"
                        ],
                        colleges: [
                          "Top Tier National Institutes",
                          "Premium State Universities",
                          "Reputed Private Colleges"
                        ],
                        jobs: [
                          "Dental Professor",
                          "Dental Researcher",
                          "Dean of Dental College",
                          "Oral Pathology Expert"
                        ]
                      }
                    }
                  ]
                }
              ]
            },
            {
              id: "pharm",
              label: "Pharmacy (B.Pharm)",
              description: "4-year degree in pharmaceutical sciences. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
              details: {
                duration: "4 Years",
                fees: "₹50K - ₹2L per year",
                exams: [
                  "State CETs",
                  "BITSAT",
                  "PU CET"
                ],
                colleges: [
                  "Jamia Hamdard",
                  "Panjab University",
                  "NIPER",
                  "BITS Pilani"
                ],
                about: "This is a comprehensive program focused on Pharmacy (B.Pharm). It prepares students for advanced careers and deep academic understanding in the field.",
                subjects: [
                  "Core Theory",
                  "Advanced Practicals",
                  "Industry Case Studies",
                  "Research Methodology"
                ],
                jobs: [
                  "Pharmacist",
                  "Drug Inspector",
                  "Medical Representative",
                  "Quality Control Analyst"
                ]
              },
              children: [
                {
                  id: "mpharm",
                  label: "M.Pharm",
                  description: "Master's in Pharmacy. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
                  details: {
                    duration: "2 Years",
                    exams: [
                      "GPAT"
                    ],
                    about: "This is a comprehensive program focused on M.Pharm. It prepares students for advanced careers and deep academic understanding in the field.",
                    fees: "₹50,000 - ₹3,000,000 per year",
                    subjects: [
                      "Core Theory",
                      "Advanced Practicals",
                      "Industry Case Studies",
                      "Research Methodology"
                    ],
                    colleges: [
                      "Top Tier National Institutes",
                      "Premium State Universities",
                      "Reputed Private Colleges"
                    ],
                    jobs: [
                      "Senior Pharmacist",
                      "Pharmaceutical Scientist",
                      "Regulatory Affairs Officer",
                      "Formulation Scientist"
                    ]
                  },
                  children: [
                    {
                      id: "phd_pharm",
                      label: "Ph.D in Pharmacy",
                      description: "Research in drug development. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
                      details: {
                        duration: "3-5 Years",
                        about: "Research in novel drug delivery, pharmacology, or clinical pharmacy.",
                        fees: "Funded / ₹50K - ₹2L per year",
                        subjects: [
                          "Core Theory",
                          "Advanced Practicals",
                          "Industry Case Studies",
                          "Research Methodology"
                        ],
                        exams: [
                          "UGC NET",
                          "CSIR NET",
                          "Institute Specific Entrance"
                        ],
                        colleges: [
                          "Top Tier National Institutes",
                          "Premium State Universities",
                          "Reputed Private Colleges"
                        ],
                        jobs: [
                          "Pharmacy Professor",
                          "Drug Development Researcher",
                          "Clinical Pharmacologist",
                          "Pharma R&D Director"
                        ]
                      }
                    }
                  ]
                },
                {
                  id: "pharmd",
                  label: "Pharm.D (Doctor of Pharmacy)",
                  description: "6-year integrated doctorate in pharmacy. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
                  details: {
                    duration: "6 Years",
                    about: "A professional doctorate focused on clinical pharmacy and patient care.",
                    fees: "₹50,000 - ₹3,000,000 per year",
                    subjects: [
                      "Core Theory",
                      "Advanced Practicals",
                      "Industry Case Studies",
                      "Research Methodology"
                    ],
                    exams: [
                      "National Level Entrance",
                      "State CET",
                      "University Specific Exams"
                    ],
                    colleges: [
                      "Top Tier National Institutes",
                      "Premium State Universities",
                      "Reputed Private Colleges"
                    ],
                    jobs: [
                      "Clinical Pharmacist",
                      "Hospital Pharmacy Director",
                      "Pharmacovigilance Specialist",
                      "Drug Safety Associate"
                    ]
                  }
                }
              ]
            },
            {
              id: "agri",
              label: "Agriculture (B.Sc Agri)",
              description: "4-year degree in agricultural science. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
              details: {
                duration: "4 Years",
                exams: [
                  "ICAR AIEEA",
                  "State Agri CETs"
                ],
                colleges: [
                  "IARI",
                  "NDRI",
                  "TNAU",
                  "GBPUAT"
                ],
                about: "This is a comprehensive program focused on Agriculture (B.Sc Agri). It prepares students for advanced careers and deep academic understanding in the field.",
                fees: "₹50,000 - ₹3,000,000 per year",
                subjects: [
                  "Core Theory",
                  "Advanced Practicals",
                  "Industry Case Studies",
                  "Research Methodology"
                ],
                jobs: [
                  "Agriculture Officer",
                  "Farm Manager",
                  "Agri-Business Executive",
                  "Soil Scientist"
                ]
              },
              children: [
                {
                  id: "msc_agri",
                  label: "M.Sc Agriculture",
                  description: "Master's in agricultural specialization. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
                  details: {
                    duration: "2 Years",
                    exams: [
                      "ICAR AIEEA PG"
                    ],
                    about: "This is a comprehensive program focused on M.Sc Agriculture. It prepares students for advanced careers and deep academic understanding in the field.",
                    fees: "₹50,000 - ₹3,000,000 per year",
                    subjects: [
                      "Core Theory",
                      "Advanced Practicals",
                      "Industry Case Studies",
                      "Research Methodology"
                    ],
                    colleges: [
                      "Top Tier National Institutes",
                      "Premium State Universities",
                      "Reputed Private Colleges"
                    ],
                    jobs: [
                      "Senior Agronomist",
                      "Plant Breeder",
                      "Agricultural Research Scientist",
                      "Horticulture Specialist"
                    ]
                  },
                  children: [
                    {
                      id: "phd_agri",
                      label: "Ph.D in Agriculture",
                      description: "Doctoral research in agriculture. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
                      details: {
                        duration: "3-5 Years",
                        about: "Research in genetics, plant breeding, soil science, or agronomy.",
                        fees: "Funded / ₹50K - ₹2L per year",
                        subjects: [
                          "Core Theory",
                          "Advanced Practicals",
                          "Industry Case Studies",
                          "Research Methodology"
                        ],
                        exams: [
                          "UGC NET",
                          "CSIR NET",
                          "Institute Specific Entrance"
                        ],
                        colleges: [
                          "Top Tier National Institutes",
                          "Premium State Universities",
                          "Reputed Private Colleges"
                        ],
                        jobs: [
                          "Agriculture Professor",
                          "Principal Scientist (ICAR)",
                          "Agri-Biotech Researcher",
                          "Agriculture Policy Advisor"
                        ]
                      }
                    }
                  ]
                }
              ]
            },
            {
              id: "nursing",
              label: "Nursing (B.Sc Nursing)",
              description: "4-year degree in nursing and healthcare. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
              details: {
                duration: "4 Years",
                exams: [
                  "AIIMS Nursing",
                  "State Nursing Exams"
                ],
                colleges: [
                  "AIIMS",
                  "CMC Vellore",
                  "AFMC Pune"
                ],
                about: "This is a comprehensive program focused on Nursing (B.Sc Nursing). It prepares students for advanced careers and deep academic understanding in the field.",
                fees: "₹50,000 - ₹3,000,000 per year",
                subjects: [
                  "Core Theory",
                  "Advanced Practicals",
                  "Industry Case Studies",
                  "Research Methodology"
                ],
                jobs: [
                  "Staff Nurse",
                  "ICU Nurse",
                  "Community Health Nurse",
                  "Nursing Supervisor"
                ]
              },
              children: [
                {
                  id: "msc_nursing",
                  label: "M.Sc Nursing",
                  description: "Postgraduate nursing specialization. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
                  details: {
                    duration: "2 Years",
                    about: "This is a comprehensive program focused on M.Sc Nursing. It prepares students for advanced careers and deep academic understanding in the field.",
                    fees: "₹50,000 - ₹3,000,000 per year",
                    subjects: [
                      "Core Theory",
                      "Advanced Practicals",
                      "Industry Case Studies",
                      "Research Methodology"
                    ],
                    exams: [
                      "National Level Entrance",
                      "State CET",
                      "University Specific Exams"
                    ],
                    colleges: [
                      "Top Tier National Institutes",
                      "Premium State Universities",
                      "Reputed Private Colleges"
                    ],
                    jobs: [
                      "Nurse Practitioner",
                      "Nursing Superintendent",
                      "Clinical Nurse Specialist",
                      "Nursing Educator"
                    ]
                  },
                  children: [
                    {
                      id: "phd_nursing",
                      label: "Ph.D in Nursing",
                      description: "Advanced research in clinical nursing. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
                      details: {
                        duration: "3-5 Years",
                        about: "This is a comprehensive program focused on Ph.D in Nursing. It prepares students for advanced careers and deep academic understanding in the field.",
                        fees: "Funded / ₹50K - ₹2L per year",
                        subjects: [
                          "Core Theory",
                          "Advanced Practicals",
                          "Industry Case Studies",
                          "Research Methodology"
                        ],
                        exams: [
                          "UGC NET",
                          "CSIR NET",
                          "Institute Specific Entrance"
                        ],
                        colleges: [
                          "Top Tier National Institutes",
                          "Premium State Universities",
                          "Reputed Private Colleges"
                        ],
                        jobs: [
                          "Nursing Professor",
                          "Chief Nursing Officer",
                          "Healthcare Policy Researcher",
                          "Nursing Director"
                        ]
                      }
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: "cec",
          label: "CEC (Civics, Econ, Comm)",
          description: "Gateway to commerce, finance, and accounting. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
          details: {
            duration: "2 Years",
            subjects: [
              "Commerce",
              "Economics",
              "Civics/Accounts",
              "English"
            ],
            exams: [
              "CA Foundation",
              "CUET"
            ],
            about: "This is a comprehensive program focused on CEC (Civics, Econ, Comm). It prepares students for advanced careers and deep academic understanding in the field.",
            fees: "₹50,000 - ₹3,000,000 per year",
            colleges: [
              "Top Tier National Institutes",
              "Premium State Universities",
              "Reputed Private Colleges"
            ],
            jobs: [
              "Chartered Accountant",
              "Bank Manager",
              "Financial Analyst",
              "Business Consultant"
            ]
          },
          children: [
            {
              id: "bcom",
              label: "B.Com (Commerce)",
              description: "3-year bachelor's degree in commerce. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
              details: {
                duration: "3 Years",
                exams: [
                  "CUET",
                  "University Exams"
                ],
                colleges: [
                  "SRCC",
                  "Hindu College",
                  "St. Xavier's",
                  "Loyola College"
                ],
                about: "This is a comprehensive program focused on B.Com (Commerce). It prepares students for advanced careers and deep academic understanding in the field.",
                fees: "₹50,000 - ₹3,000,000 per year",
                subjects: [
                  "Core Theory",
                  "Advanced Practicals",
                  "Industry Case Studies",
                  "Research Methodology"
                ],
                jobs: [
                  "Accountant",
                  "Tax Consultant",
                  "Bank PO",
                  "Insurance Analyst"
                ]
              },
              children: [
                {
                  id: "mcom",
                  label: "M.Com",
                  description: "Master's degree in commerce. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
                  details: {
                    duration: "2 Years",
                    about: "This is a comprehensive program focused on M.Com. It prepares students for advanced careers and deep academic understanding in the field.",
                    fees: "₹50,000 - ₹3,000,000 per year",
                    subjects: [
                      "Core Theory",
                      "Advanced Practicals",
                      "Industry Case Studies",
                      "Research Methodology"
                    ],
                    exams: [
                      "National Level Entrance",
                      "State CET",
                      "University Specific Exams"
                    ],
                    colleges: [
                      "Top Tier National Institutes",
                      "Premium State Universities",
                      "Reputed Private Colleges"
                    ],
                    jobs: [
                      "Senior Accountant",
                      "Financial Analyst",
                      "University Lecturer",
                      "Audit Manager"
                    ]
                  },
                  children: [
                    {
                      id: "phd_com",
                      label: "Ph.D in Commerce",
                      description: "Doctorate in commerce and trade. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
                      details: {
                        duration: "3-5 Years",
                        about: "This is a comprehensive program focused on Ph.D in Commerce. It prepares students for advanced careers and deep academic understanding in the field.",
                        fees: "Funded / ₹50K - ₹2L per year",
                        subjects: [
                          "Core Theory",
                          "Advanced Practicals",
                          "Industry Case Studies",
                          "Research Methodology"
                        ],
                        exams: [
                          "UGC NET",
                          "CSIR NET",
                          "Institute Specific Entrance"
                        ],
                        colleges: [
                          "Top Tier National Institutes",
                          "Premium State Universities",
                          "Reputed Private Colleges"
                        ],
                        jobs: [
                          "Commerce Professor",
                          "Economic Researcher",
                          "Policy Analyst",
                          "Finance Director"
                        ]
                      }
                    }
                  ]
                },
                {
                  id: "mba_com",
                  label: "MBA",
                  description: "Master of Business Administration. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
                  details: {
                    duration: "2 Years",
                    exams: [
                      "CAT",
                      "XAT",
                      "MAT"
                    ],
                    about: "This is a comprehensive program focused on MBA. It prepares students for advanced careers and deep academic understanding in the field.",
                    fees: "₹50,000 - ₹3,000,000 per year",
                    subjects: [
                      "Core Theory",
                      "Advanced Practicals",
                      "Industry Case Studies",
                      "Research Methodology"
                    ],
                    colleges: [
                      "Top Tier National Institutes",
                      "Premium State Universities",
                      "Reputed Private Colleges"
                    ],
                    jobs: [
                      "Marketing Manager",
                      "HR Manager",
                      "Finance Manager",
                      "Strategy Consultant"
                    ]
                  },
                  children: [
                    {
                      id: "phd_mgmt_com",
                      label: "Ph.D in Management",
                      description: "Doctoral research in business. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
                      details: {
                        duration: "3-5 Years",
                        about: "This is a comprehensive program focused on Ph.D in Management. It prepares students for advanced careers and deep academic understanding in the field.",
                        fees: "Funded / ₹50K - ₹2L per year",
                        subjects: [
                          "Core Theory",
                          "Advanced Practicals",
                          "Industry Case Studies",
                          "Research Methodology"
                        ],
                        exams: [
                          "UGC NET",
                          "CSIR NET",
                          "Institute Specific Entrance"
                        ],
                        colleges: [
                          "Top Tier National Institutes",
                          "Premium State Universities",
                          "Reputed Private Colleges"
                        ],
                        jobs: [
                          "Management Professor",
                          "Strategy Consultant",
                          "Dean of Business School",
                          "Policy Researcher"
                        ]
                      }
                    }
                  ]
                }
              ]
            },
            {
              id: "ca",
              label: "Chartered Accountancy (CA)",
              description: "Professional certification in accounting and finance. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
              details: {
                duration: "4-5 Years",
                exams: [
                  "CA Foundation",
                  "CA Intermediate",
                  "CA Final"
                ],
                subjects: [
                  "Accounting",
                  "Taxation",
                  "Law",
                  "Audit"
                ],
                colleges: [
                  "ICAI (Institute body)"
                ],
                about: "This is a comprehensive program focused on Chartered Accountancy (CA). It prepares students for advanced careers and deep academic understanding in the field.",
                fees: "₹50,000 - ₹3,000,000 per year",
                jobs: [
                  "Chartered Accountant",
                  "Audit Partner",
                  "CFO",
                  "Tax Advisor"
                ]
              },
              children: [
                {
                  id: "ca_practice",
                  label: "Independent Practice",
                  description: "Start your own CA firm. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
                  details: {
                    about: "Work independently as a certified auditor and tax consultant.",
                    duration: "3-4 Years",
                    fees: "₹50,000 - ₹3,000,000 per year",
                    subjects: [
                      "Core Theory",
                      "Advanced Practicals",
                      "Industry Case Studies",
                      "Research Methodology"
                    ],
                    exams: [
                      "National Level Entrance",
                      "State CET",
                      "University Specific Exams"
                    ],
                    colleges: [
                      "Top Tier National Institutes",
                      "Premium State Universities",
                      "Reputed Private Colleges"
                    ],
                    jobs: [
                      "CA Practitioner",
                      "Tax Consultant (Independent)",
                      "Financial Advisor",
                      "Forensic Auditor"
                    ]
                  }
                },
                {
                  id: "ca_corp",
                  label: "Corporate Finance/Audit",
                  description: "Work in corporate finance and auditing. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
                  details: {
                    about: "Join Big 4 (Deloitte, PwC, EY, KPMG) or corporate finance teams.",
                    duration: "3-4 Years",
                    fees: "₹50,000 - ₹3,000,000 per year",
                    subjects: [
                      "Core Theory",
                      "Advanced Practicals",
                      "Industry Case Studies",
                      "Research Methodology"
                    ],
                    exams: [
                      "National Level Entrance",
                      "State CET",
                      "University Specific Exams"
                    ],
                    colleges: [
                      "Top Tier National Institutes",
                      "Premium State Universities",
                      "Reputed Private Colleges"
                    ],
                    jobs: [
                      "Internal Auditor",
                      "Corporate Finance Manager",
                      "Risk Analyst",
                      "Compliance Officer"
                    ]
                  }
                }
              ]
            },
            {
              id: "bba",
              label: "BBA (Business Admin)",
              description: "3-year bachelor's degree in business management. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
              details: {
                duration: "3 Years",
                exams: [
                  "CUET",
                  "IPMAT",
                  "NPAT",
                  "SET"
                ],
                colleges: [
                  "IIM Indore (IPM)",
                  "NMIMS",
                  "Symbiosis",
                  "Christ University"
                ],
                about: "This is a comprehensive program focused on BBA (Business Admin). It prepares students for advanced careers and deep academic understanding in the field.",
                fees: "₹50,000 - ₹3,000,000 per year",
                subjects: [
                  "Core Theory",
                  "Advanced Practicals",
                  "Industry Case Studies",
                  "Research Methodology"
                ],
                jobs: [
                  "Business Development Executive",
                  "HR Executive",
                  "Marketing Coordinator",
                  "Office Manager"
                ]
              },
              children: [
                {
                  id: "mba_bba",
                  label: "MBA",
                  description: "Master of Business Administration. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
                  details: {
                    duration: "2 Years",
                    exams: [
                      "CAT"
                    ],
                    about: "This is a comprehensive program focused on MBA. It prepares students for advanced careers and deep academic understanding in the field.",
                    fees: "₹50,000 - ₹3,000,000 per year",
                    subjects: [
                      "Core Theory",
                      "Advanced Practicals",
                      "Industry Case Studies",
                      "Research Methodology"
                    ],
                    colleges: [
                      "Top Tier National Institutes",
                      "Premium State Universities",
                      "Reputed Private Colleges"
                    ],
                    jobs: [
                      "Marketing Manager",
                      "HR Manager",
                      "Finance Manager",
                      "Strategy Consultant"
                    ]
                  },
                  children: [
                    {
                      id: "phd_bus",
                      label: "Ph.D in Business Admin",
                      description: "Doctorate in management studies. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
                      details: {
                        duration: "3-5 Years",
                        about: "This is a comprehensive program focused on Ph.D in Business Admin. It prepares students for advanced careers and deep academic understanding in the field.",
                        fees: "Funded / ₹50K - ₹2L per year",
                        subjects: [
                          "Core Theory",
                          "Advanced Practicals",
                          "Industry Case Studies",
                          "Research Methodology"
                        ],
                        exams: [
                          "UGC NET",
                          "CSIR NET",
                          "Institute Specific Entrance"
                        ],
                        colleges: [
                          "Top Tier National Institutes",
                          "Premium State Universities",
                          "Reputed Private Colleges"
                        ],
                        jobs: [
                          "Business Professor",
                          "Strategy Researcher",
                          "Corporate Trainer",
                          "Think Tank Fellow"
                        ]
                      }
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: "hec",
          label: "HEC (Arts & Humanities)",
          description: "Gateway to arts, humanities, law, and design. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
          details: {
            duration: "2 Years",
            subjects: [
              "History",
              "Economics",
              "Civics",
              "Languages"
            ],
            exams: [
              "CUET",
              "CLAT (for Law)",
              "NID DAT (for Design)"
            ],
            about: "This is a comprehensive program focused on HEC (Arts & Humanities). It prepares students for advanced careers and deep academic understanding in the field.",
            fees: "₹50,000 - ₹3,000,000 per year",
            colleges: [
              "Top Tier National Institutes",
              "Premium State Universities",
              "Reputed Private Colleges"
            ],
            jobs: [
              "Lawyer",
              "Journalist",
              "Civil Services Officer",
              "Designer"
            ]
          },
          children: [
            {
              id: "ba",
              label: "Bachelor of Arts (BA)",
              description: "3-year degree in arts and humanities. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
              details: {
                duration: "3 Years",
                exams: [
                  "CUET"
                ],
                colleges: [
                  "St. Stephen's",
                  "LSR",
                  "Hindu College",
                  "Madras Christian College"
                ],
                about: "This is a comprehensive program focused on Bachelor of Arts (BA). It prepares students for advanced careers and deep academic understanding in the field.",
                fees: "₹50,000 - ₹3,000,000 per year",
                subjects: [
                  "Core Theory",
                  "Advanced Practicals",
                  "Industry Case Studies",
                  "Research Methodology"
                ],
                jobs: [
                  "Content Writer",
                  "Journalist",
                  "Social Worker",
                  "Government Services (UPSC)"
                ]
              },
              children: [
                {
                  id: "ma",
                  label: "Master of Arts (MA)",
                  description: "Master's specialization in arts. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
                  details: {
                    duration: "2 Years",
                    about: "This is a comprehensive program focused on Master of Arts (MA). It prepares students for advanced careers and deep academic understanding in the field.",
                    fees: "₹50,000 - ₹3,000,000 per year",
                    subjects: [
                      "Core Theory",
                      "Advanced Practicals",
                      "Industry Case Studies",
                      "Research Methodology"
                    ],
                    exams: [
                      "National Level Entrance",
                      "State CET",
                      "University Specific Exams"
                    ],
                    colleges: [
                      "Top Tier National Institutes",
                      "Premium State Universities",
                      "Reputed Private Colleges"
                    ],
                    jobs: [
                      "University Lecturer",
                      "Research Associate",
                      "Policy Analyst",
                      "Museum Curator"
                    ]
                  },
                  children: [
                    {
                      id: "phd_arts",
                      label: "Ph.D in Arts/Humanities",
                      description: "Doctoral research in humanities. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
                      details: {
                        duration: "3-5 Years",
                        about: "This is a comprehensive program focused on Ph.D in Arts/Humanities. It prepares students for advanced careers and deep academic understanding in the field.",
                        fees: "Funded / ₹50K - ₹2L per year",
                        subjects: [
                          "Core Theory",
                          "Advanced Practicals",
                          "Industry Case Studies",
                          "Research Methodology"
                        ],
                        exams: [
                          "UGC NET",
                          "CSIR NET",
                          "Institute Specific Entrance"
                        ],
                        colleges: [
                          "Top Tier National Institutes",
                          "Premium State Universities",
                          "Reputed Private Colleges"
                        ],
                        jobs: [
                          "Arts Professor",
                          "Senior Researcher",
                          "Cultural Advisor",
                          "Academic Author"
                        ]
                      }
                    }
                  ]
                }
              ]
            },
            {
              id: "law",
              label: "Law (BA LLB)",
              description: "5-year integrated law degree. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
              details: {
                duration: "5 Years",
                exams: [
                  "CLAT",
                  "AILET",
                  "LSAT India"
                ],
                colleges: [
                  "NLSIU Bangalore",
                  "NLU Delhi",
                  "NALSAR",
                  "Symbiosis Law School"
                ],
                about: "This is a comprehensive program focused on Law (BA LLB). It prepares students for advanced careers and deep academic understanding in the field.",
                fees: "₹50,000 - ₹3,000,000 per year",
                subjects: [
                  "Core Theory",
                  "Advanced Practicals",
                  "Industry Case Studies",
                  "Research Methodology"
                ],
                jobs: [
                  "Advocate",
                  "Legal Advisor",
                  "Corporate Lawyer",
                  "Public Prosecutor"
                ]
              },
              children: [
                {
                  id: "llm",
                  label: "LLM (Master of Laws)",
                  description: "Postgraduate degree in law. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
                  details: {
                    duration: "1-2 Years",
                    exams: [
                      "CLAT PG"
                    ],
                    about: "This is a comprehensive program focused on LLM (Master of Laws). It prepares students for advanced careers and deep academic understanding in the field.",
                    fees: "₹50,000 - ₹3,000,000 per year",
                    subjects: [
                      "Core Theory",
                      "Advanced Practicals",
                      "Industry Case Studies",
                      "Research Methodology"
                    ],
                    colleges: [
                      "Top Tier National Institutes",
                      "Premium State Universities",
                      "Reputed Private Colleges"
                    ],
                    jobs: [
                      "Senior Advocate",
                      "Legal Consultant",
                      "Judge (after exam)",
                      "International Law Specialist"
                    ]
                  },
                  children: [
                    {
                      id: "lld",
                      label: "LLD (Doctor of Laws) / Judiciary",
                      description: "Doctorate in law or judicial services. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
                      details: {
                        about: "Clear Judiciary Exams to become a judge, or pursue LLD for academia.",
                        duration: "3-4 Years",
                        fees: "₹50,000 - ₹3,000,000 per year",
                        subjects: [
                          "Core Theory",
                          "Advanced Practicals",
                          "Industry Case Studies",
                          "Research Methodology"
                        ],
                        exams: [
                          "National Level Entrance",
                          "State CET",
                          "University Specific Exams"
                        ],
                        colleges: [
                          "Top Tier National Institutes",
                          "Premium State Universities",
                          "Reputed Private Colleges"
                        ],
                        jobs: [
                          "High Court Judge",
                          "Law Professor",
                          "Legal Scholar",
                          "Supreme Court Advocate"
                        ]
                      }
                    }
                  ]
                }
              ]
            },
            {
              id: "design",
              label: "Design & Fine Arts (B.Des/BFA)",
              description: "4-year degree in design and fine arts. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
              details: {
                duration: "4 Years",
                exams: [
                  "NID DAT",
                  "UCEED",
                  "NIFT Entrance"
                ],
                colleges: [
                  "NID",
                  "NIFT",
                  "IIT Bombay (IDC)",
                  "Srishti"
                ],
                about: "This is a comprehensive program focused on Design & Fine Arts (B.Des/BFA). It prepares students for advanced careers and deep academic understanding in the field.",
                fees: "₹50,000 - ₹3,000,000 per year",
                subjects: [
                  "Core Theory",
                  "Advanced Practicals",
                  "Industry Case Studies",
                  "Research Methodology"
                ],
                jobs: [
                  "Graphic Designer",
                  "UI/UX Designer",
                  "Art Director",
                  "Illustrator"
                ]
              },
              children: [
                {
                  id: "mdes",
                  label: "M.Des / MFA",
                  description: "Master's degree in design or fine arts. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
                  details: {
                    duration: "2 Years",
                    exams: [
                      "CEED"
                    ],
                    about: "This is a comprehensive program focused on M.Des / MFA. It prepares students for advanced careers and deep academic understanding in the field.",
                    fees: "₹50,000 - ₹3,000,000 per year",
                    subjects: [
                      "Core Theory",
                      "Advanced Practicals",
                      "Industry Case Studies",
                      "Research Methodology"
                    ],
                    colleges: [
                      "Top Tier National Institutes",
                      "Premium State Universities",
                      "Reputed Private Colleges"
                    ],
                    jobs: [
                      "Senior UX Designer",
                      "Design Lead",
                      "Creative Director",
                      "Design Researcher"
                    ]
                  },
                  children: [
                    {
                      id: "phd_design",
                      label: "Ph.D in Design",
                      description: "Doctoral research in design methodologies. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
                      details: {
                        duration: "3-5 Years",
                        about: "This is a comprehensive program focused on Ph.D in Design. It prepares students for advanced careers and deep academic understanding in the field.",
                        fees: "Funded / ₹50K - ₹2L per year",
                        subjects: [
                          "Core Theory",
                          "Advanced Practicals",
                          "Industry Case Studies",
                          "Research Methodology"
                        ],
                        exams: [
                          "UGC NET",
                          "CSIR NET",
                          "Institute Specific Entrance"
                        ],
                        colleges: [
                          "Top Tier National Institutes",
                          "Premium State Universities",
                          "Reputed Private Colleges"
                        ],
                        jobs: [
                          "Design Professor",
                          "Design Thinking Consultant",
                          "Chief Design Officer",
                          "Research Fellow"
                        ]
                      }
                    }
                  ]
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
      description: "3-year practical engineering courses. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
      details: {
        duration: "3 Years",
        fees: "₹10K - ₹50K per year",
        exams: [
          "State Polytechnic Entrance (POLYCET)"
        ],
        about: "A practice-oriented diploma that equips students with core technical skills.",
        subjects: [
          "Core Theory",
          "Advanced Practicals",
          "Industry Case Studies",
          "Research Methodology"
        ],
        colleges: [
          "Top Tier National Institutes",
          "Premium State Universities",
          "Reputed Private Colleges"
        ],
        jobs: [
          "Junior Engineer",
          "Technician",
          "Site Supervisor",
          "CAD Draftsman"
        ]
      },
      children: [
        {
          id: "mech_dip",
          label: "Mechanical Engineering",
          description: "Core engineering diploma in mechanics. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
          details: {
            duration: "3 Years",
            about: "This is a comprehensive program focused on Mechanical Engineering. It prepares students for advanced careers and deep academic understanding in the field.",
            fees: "₹50,000 - ₹3,000,000 per year",
            subjects: [
              "Core Theory",
              "Advanced Practicals",
              "Industry Case Studies",
              "Research Methodology"
            ],
            exams: [
              "National Level Entrance",
              "State CET",
              "University Specific Exams"
            ],
            colleges: [
              "Top Tier National Institutes",
              "Premium State Universities",
              "Reputed Private Colleges"
            ],
            jobs: [
              "CNC Operator",
              "Maintenance Technician",
              "Quality Inspector",
              "Workshop Supervisor"
            ]
          },
          children: [
            {
              id: "btech_lat_mech",
              label: "B.Tech (Lateral Entry)",
              description: "Direct admission to 2nd year B.Tech. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
              details: {
                duration: "3 Years",
                exams: [
                  "State Lateral Entry CET"
                ],
                about: "This is a comprehensive program focused on B.Tech (Lateral Entry). It prepares students for advanced careers and deep academic understanding in the field.",
                fees: "₹50,000 - ₹3,000,000 per year",
                subjects: [
                  "Core Theory",
                  "Advanced Practicals",
                  "Industry Case Studies",
                  "Research Methodology"
                ],
                colleges: [
                  "Top Tier National Institutes",
                  "Premium State Universities",
                  "Reputed Private Colleges"
                ],
                jobs: [
                  "Design Engineer",
                  "Production Engineer",
                  "Project Engineer",
                  "Quality Engineer"
                ]
              },
              children: [
                {
                  id: "mtech_lat_mech",
                  label: "M.Tech",
                  description: "Master of Technology. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
                  details: {
                    duration: "2 Years",
                    exams: [
                      "GATE"
                    ],
                    about: "This is a comprehensive program focused on M.Tech. It prepares students for advanced careers and deep academic understanding in the field.",
                    fees: "₹50,000 - ₹3,000,000 per year",
                    subjects: [
                      "Core Theory",
                      "Advanced Practicals",
                      "Industry Case Studies",
                      "Research Methodology"
                    ],
                    colleges: [
                      "Top Tier National Institutes",
                      "Premium State Universities",
                      "Reputed Private Colleges"
                    ],
                    jobs: [
                      "Senior Design Engineer",
                      "R&D Lead",
                      "Technical Manager",
                      "Simulation Engineer"
                    ]
                  },
                  children: [
                    {
                      id: "phd_lat_mech",
                      label: "Ph.D",
                      description: "Doctorate in engineering. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
                      details: {
                        duration: "3-5 Years",
                        about: "This is a comprehensive program focused on Ph.D. It prepares students for advanced careers and deep academic understanding in the field.",
                        fees: "Funded / ₹50K - ₹2L per year",
                        subjects: [
                          "Core Theory",
                          "Advanced Practicals",
                          "Industry Case Studies",
                          "Research Methodology"
                        ],
                        exams: [
                          "UGC NET",
                          "CSIR NET",
                          "Institute Specific Entrance"
                        ],
                        colleges: [
                          "Top Tier National Institutes",
                          "Premium State Universities",
                          "Reputed Private Colleges"
                        ],
                        jobs: [
                          "Engineering Professor",
                          "Research Scientist",
                          "Principal Engineer",
                          "Technical Director"
                        ]
                      }
                    }
                  ]
                }
              ]
            },
            {
              id: "dip_jobs_mech",
              label: "Junior Engineer",
              description: "Employment as a mechanical diploma engineer. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
              details: {
                about: "Work in manufacturing, automotive, or heavy machinery industries.",
                duration: "3-4 Years",
                fees: "N/A",
                jobs: [
                  "Junior Engineer (Railways)",
                  "JE (State PWD)",
                  "Site Supervisor",
                  "Technical Assistant"
                ]
              }
            }
          ]
        },
        {
          id: "civil_dip",
          label: "Civil Engineering",
          description: "Core engineering diploma in construction. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
          details: {
            duration: "3 Years",
            about: "This is a comprehensive program focused on Civil Engineering. It prepares students for advanced careers and deep academic understanding in the field.",
            fees: "₹50,000 - ₹3,000,000 per year",
            subjects: [
              "Core Theory",
              "Advanced Practicals",
              "Industry Case Studies",
              "Research Methodology"
            ],
            exams: [
              "National Level Entrance",
              "State CET",
              "University Specific Exams"
            ],
            colleges: [
              "Top Tier National Institutes",
              "Premium State Universities",
              "Reputed Private Colleges"
            ],
            jobs: [
              "Site Engineer",
              "Surveyor",
              "Draftsman",
              "PWD Technician"
            ]
          },
          children: [
            {
              id: "btech_lat_civil",
              label: "B.Tech (Lateral Entry)",
              description: "Direct admission to 2nd year B.Tech. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
              details: {
                duration: "3 Years",
                exams: [
                  "State Lateral Entry CET"
                ],
                about: "This is a comprehensive program focused on B.Tech (Lateral Entry). It prepares students for advanced careers and deep academic understanding in the field.",
                fees: "₹50,000 - ₹3,000,000 per year",
                subjects: [
                  "Core Theory",
                  "Advanced Practicals",
                  "Industry Case Studies",
                  "Research Methodology"
                ],
                colleges: [
                  "Top Tier National Institutes",
                  "Premium State Universities",
                  "Reputed Private Colleges"
                ],
                jobs: [
                  "Design Engineer",
                  "Production Engineer",
                  "Project Engineer",
                  "Quality Engineer"
                ]
              },
              children: [
                {
                  id: "mtech_lat_civil",
                  label: "M.Tech",
                  description: "Master of Technology. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
                  details: {
                    duration: "2 Years",
                    exams: [
                      "GATE"
                    ],
                    about: "This is a comprehensive program focused on M.Tech. It prepares students for advanced careers and deep academic understanding in the field.",
                    fees: "₹50,000 - ₹3,000,000 per year",
                    subjects: [
                      "Core Theory",
                      "Advanced Practicals",
                      "Industry Case Studies",
                      "Research Methodology"
                    ],
                    colleges: [
                      "Top Tier National Institutes",
                      "Premium State Universities",
                      "Reputed Private Colleges"
                    ],
                    jobs: [
                      "Senior Design Engineer",
                      "R&D Lead",
                      "Technical Manager",
                      "Simulation Engineer"
                    ]
                  },
                  children: [
                    {
                      id: "phd_lat_civil",
                      label: "Ph.D",
                      description: "Doctorate in civil engineering. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
                      details: {
                        duration: "3-5 Years",
                        about: "This is a comprehensive program focused on Ph.D. It prepares students for advanced careers and deep academic understanding in the field.",
                        fees: "Funded / ₹50K - ₹2L per year",
                        subjects: [
                          "Core Theory",
                          "Advanced Practicals",
                          "Industry Case Studies",
                          "Research Methodology"
                        ],
                        exams: [
                          "UGC NET",
                          "CSIR NET",
                          "Institute Specific Entrance"
                        ],
                        colleges: [
                          "Top Tier National Institutes",
                          "Premium State Universities",
                          "Reputed Private Colleges"
                        ],
                        jobs: [
                          "Engineering Professor",
                          "Research Scientist",
                          "Principal Engineer",
                          "Technical Director"
                        ]
                      }
                    }
                  ]
                }
              ]
            },
            {
              id: "dip_jobs_civil",
              label: "Junior Engineer",
              description: "Employment as a civil diploma engineer. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
              details: {
                about: "Work in construction, public works, and surveying.",
                duration: "3-4 Years",
                fees: "N/A",
                jobs: [
                  "Junior Engineer (Railways)",
                  "JE (State PWD)",
                  "Site Supervisor",
                  "Technical Assistant"
                ]
              }
            }
          ]
        },
        {
          id: "cs_dip",
          label: "Computer Science",
          description: "Engineering diploma in software. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
          details: {
            duration: "3 Years",
            about: "This is a comprehensive program focused on Computer Science. It prepares students for advanced careers and deep academic understanding in the field.",
            fees: "₹50,000 - ₹3,000,000 per year",
            subjects: [
              "Core Theory",
              "Advanced Practicals",
              "Industry Case Studies",
              "Research Methodology"
            ],
            exams: [
              "National Level Entrance",
              "State CET",
              "University Specific Exams"
            ],
            colleges: [
              "Top Tier National Institutes",
              "Premium State Universities",
              "Reputed Private Colleges"
            ],
            jobs: [
              "Web Developer",
              "IT Support Engineer",
              "Junior Programmer",
              "Technical Support"
            ]
          },
          children: [
            {
              id: "btech_lat_cs",
              label: "B.Tech (Lateral Entry)",
              description: "Direct admission to 2nd year B.Tech. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
              details: {
                duration: "3 Years",
                exams: [
                  "State Lateral Entry CET"
                ],
                about: "This is a comprehensive program focused on B.Tech (Lateral Entry). It prepares students for advanced careers and deep academic understanding in the field.",
                fees: "₹50,000 - ₹3,000,000 per year",
                subjects: [
                  "Core Theory",
                  "Advanced Practicals",
                  "Industry Case Studies",
                  "Research Methodology"
                ],
                colleges: [
                  "Top Tier National Institutes",
                  "Premium State Universities",
                  "Reputed Private Colleges"
                ],
                jobs: [
                  "Design Engineer",
                  "Production Engineer",
                  "Project Engineer",
                  "Quality Engineer"
                ]
              },
              children: [
                {
                  id: "mtech_lat_cs",
                  label: "M.Tech",
                  description: "Master of Technology. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
                  details: {
                    duration: "2 Years",
                    exams: [
                      "GATE"
                    ],
                    about: "This is a comprehensive program focused on M.Tech. It prepares students for advanced careers and deep academic understanding in the field.",
                    fees: "₹50,000 - ₹3,000,000 per year",
                    subjects: [
                      "Core Theory",
                      "Advanced Practicals",
                      "Industry Case Studies",
                      "Research Methodology"
                    ],
                    colleges: [
                      "Top Tier National Institutes",
                      "Premium State Universities",
                      "Reputed Private Colleges"
                    ],
                    jobs: [
                      "Senior Design Engineer",
                      "R&D Lead",
                      "Technical Manager",
                      "Simulation Engineer"
                    ]
                  },
                  children: [
                    {
                      id: "phd_lat_cs",
                      label: "Ph.D",
                      description: "Doctorate in computer science. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
                      details: {
                        duration: "3-5 Years",
                        about: "This is a comprehensive program focused on Ph.D. It prepares students for advanced careers and deep academic understanding in the field.",
                        fees: "Funded / ₹50K - ₹2L per year",
                        subjects: [
                          "Core Theory",
                          "Advanced Practicals",
                          "Industry Case Studies",
                          "Research Methodology"
                        ],
                        exams: [
                          "UGC NET",
                          "CSIR NET",
                          "Institute Specific Entrance"
                        ],
                        colleges: [
                          "Top Tier National Institutes",
                          "Premium State Universities",
                          "Reputed Private Colleges"
                        ],
                        jobs: [
                          "Engineering Professor",
                          "Research Scientist",
                          "Principal Engineer",
                          "Technical Director"
                        ]
                      }
                    }
                  ]
                }
              ]
            },
            {
              id: "dip_jobs_cs",
              label: "Junior Software Engineer",
              description: "Employment as a software diploma engineer. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
              details: {
                about: "Work in IT services, web development, and tech support.",
                duration: "3-4 Years",
                fees: "N/A",
                jobs: [
                  "Software Developer",
                  "QA Tester",
                  "IT Helpdesk",
                  "System Administrator"
                ]
              }
            }
          ]
        },
        {
          id: "ece_dip",
          label: "Electronics & Communication",
          description: "Engineering diploma in electronics. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
          details: {
            duration: "3 Years",
            about: "This is a comprehensive program focused on Electronics & Communication. It prepares students for advanced careers and deep academic understanding in the field.",
            fees: "₹50,000 - ₹3,000,000 per year",
            subjects: [
              "Core Theory",
              "Advanced Practicals",
              "Industry Case Studies",
              "Research Methodology"
            ],
            exams: [
              "National Level Entrance",
              "State CET",
              "University Specific Exams"
            ],
            colleges: [
              "Top Tier National Institutes",
              "Premium State Universities",
              "Reputed Private Colleges"
            ],
            jobs: [
              "Electronics Technician",
              "Telecom Technician",
              "PCB Designer",
              "Embedded Systems Tech"
            ]
          },
          children: [
            {
              id: "btech_lat_ece",
              label: "B.Tech (Lateral Entry)",
              description: "Direct admission to 2nd year B.Tech. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
              details: {
                duration: "3 Years",
                exams: [
                  "State Lateral Entry CET"
                ],
                about: "This is a comprehensive program focused on B.Tech (Lateral Entry). It prepares students for advanced careers and deep academic understanding in the field.",
                fees: "₹50,000 - ₹3,000,000 per year",
                subjects: [
                  "Core Theory",
                  "Advanced Practicals",
                  "Industry Case Studies",
                  "Research Methodology"
                ],
                colleges: [
                  "Top Tier National Institutes",
                  "Premium State Universities",
                  "Reputed Private Colleges"
                ],
                jobs: [
                  "Design Engineer",
                  "Production Engineer",
                  "Project Engineer",
                  "Quality Engineer"
                ]
              },
              children: [
                {
                  id: "mtech_lat_ece",
                  label: "M.Tech",
                  description: "Master of Technology. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
                  details: {
                    duration: "2 Years",
                    exams: [
                      "GATE"
                    ],
                    about: "This is a comprehensive program focused on M.Tech. It prepares students for advanced careers and deep academic understanding in the field.",
                    fees: "₹50,000 - ₹3,000,000 per year",
                    subjects: [
                      "Core Theory",
                      "Advanced Practicals",
                      "Industry Case Studies",
                      "Research Methodology"
                    ],
                    colleges: [
                      "Top Tier National Institutes",
                      "Premium State Universities",
                      "Reputed Private Colleges"
                    ],
                    jobs: [
                      "Senior Design Engineer",
                      "R&D Lead",
                      "Technical Manager",
                      "Simulation Engineer"
                    ]
                  },
                  children: [
                    {
                      id: "phd_lat_ece",
                      label: "Ph.D",
                      description: "Doctorate in electronics. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
                      details: {
                        duration: "3-5 Years",
                        about: "This is a comprehensive program focused on Ph.D. It prepares students for advanced careers and deep academic understanding in the field.",
                        fees: "Funded / ₹50K - ₹2L per year",
                        subjects: [
                          "Core Theory",
                          "Advanced Practicals",
                          "Industry Case Studies",
                          "Research Methodology"
                        ],
                        exams: [
                          "UGC NET",
                          "CSIR NET",
                          "Institute Specific Entrance"
                        ],
                        colleges: [
                          "Top Tier National Institutes",
                          "Premium State Universities",
                          "Reputed Private Colleges"
                        ],
                        jobs: [
                          "Engineering Professor",
                          "Research Scientist",
                          "Principal Engineer",
                          "Technical Director"
                        ]
                      }
                    }
                  ]
                }
              ]
            },
            {
              id: "dip_jobs_ece",
              label: "Junior Electronics Engineer",
              description: "Employment as an electronics diploma engineer. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
              details: {
                about: "Work in telecommunications, IoT, and hardware manufacturing.",
                duration: "3-4 Years",
                fees: "N/A",
                jobs: [
                  "Maintenance Engineer",
                  "Service Engineer",
                  "Network Technician",
                  "Instrumentation Tech"
                ]
              }
            }
          ]
        }
      ]
    },
    {
      id: "paramedical",
      label: "Paramedical Courses",
      description: "Diploma in medical support services. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
      details: {
        duration: "2-3 Years",
        about: "Allied healthcare courses that form the backbone of the medical diagnostic and support system.",
        exams: [
          "State Paramedical Board Exams"
        ],
        fees: "₹50,000 - ₹3,000,000 per year",
        subjects: [
          "Core Theory",
          "Advanced Practicals",
          "Industry Case Studies",
          "Research Methodology"
        ],
        colleges: [
          "Top Tier National Institutes",
          "Premium State Universities",
          "Reputed Private Colleges"
        ],
        jobs: [
          "Lab Technician",
          "Radiology Technician",
          "Optometrist",
          "Physiotherapist"
        ]
      },
      children: [
        {
          id: "dmlt",
          label: "DMLT",
          description: "Diploma in Medical Laboratory Technology. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
          details: {
            duration: "2 Years",
            about: "This is a comprehensive program focused on DMLT. It prepares students for advanced careers and deep academic understanding in the field.",
            fees: "₹50,000 - ₹3,000,000 per year",
            subjects: [
              "Core Theory",
              "Advanced Practicals",
              "Industry Case Studies",
              "Research Methodology"
            ],
            exams: [
              "National Level Entrance",
              "State CET",
              "University Specific Exams"
            ],
            colleges: [
              "Top Tier National Institutes",
              "Premium State Universities",
              "Reputed Private Colleges"
            ],
            jobs: [
              "Pathology Lab Technician",
              "Blood Bank Technician",
              "Microbiology Lab Technician",
              "Biochemistry Analyst"
            ]
          },
          children: [
            {
              id: "bsc_paramed_dmlt",
              label: "B.Sc Paramedical",
              description: "Bachelor's degree in allied health. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
              details: {
                duration: "3 Years",
                about: "This is a comprehensive program focused on B.Sc Paramedical. It prepares students for advanced careers and deep academic understanding in the field.",
                fees: "₹50,000 - ₹3,000,000 per year",
                subjects: [
                  "Core Theory",
                  "Advanced Practicals",
                  "Industry Case Studies",
                  "Research Methodology"
                ],
                exams: [
                  "National Level Entrance",
                  "State CET",
                  "University Specific Exams"
                ],
                colleges: [
                  "Top Tier National Institutes",
                  "Premium State Universities",
                  "Reputed Private Colleges"
                ],
                jobs: [
                  "Senior Lab Technologist",
                  "Lab Supervisor",
                  "Clinical Lab Scientist",
                  "Histopathology Technologist"
                ]
              },
              children: [
                {
                  id: "msc_paramed_dmlt",
                  label: "M.Sc Paramedical",
                  description: "Master's degree in allied health. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
                  details: {
                    duration: "2 Years",
                    about: "This is a comprehensive program focused on M.Sc Paramedical. It prepares students for advanced careers and deep academic understanding in the field.",
                    fees: "₹50,000 - ₹3,000,000 per year",
                    subjects: [
                      "Core Theory",
                      "Advanced Practicals",
                      "Industry Case Studies",
                      "Research Methodology"
                    ],
                    exams: [
                      "National Level Entrance",
                      "State CET",
                      "University Specific Exams"
                    ],
                    colleges: [
                      "Top Tier National Institutes",
                      "Premium State Universities",
                      "Reputed Private Colleges"
                    ],
                    jobs: [
                      "Chief Lab Technologist",
                      "Lab Director",
                      "Research Scientist (Lab Medicine)",
                      "Quality Manager"
                    ]
                  },
                  children: [
                    {
                      id: "phd_paramed_dmlt",
                      label: "Ph.D",
                      description: "Doctorate in clinical research. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
                      details: {
                        duration: "3-5 Years",
                        about: "This is a comprehensive program focused on Ph.D. It prepares students for advanced careers and deep academic understanding in the field.",
                        fees: "Funded / ₹50K - ₹2L per year",
                        subjects: [
                          "Core Theory",
                          "Advanced Practicals",
                          "Industry Case Studies",
                          "Research Methodology"
                        ],
                        exams: [
                          "UGC NET",
                          "CSIR NET",
                          "Institute Specific Entrance"
                        ],
                        colleges: [
                          "Top Tier National Institutes",
                          "Premium State Universities",
                          "Reputed Private Colleges"
                        ],
                        jobs: [
                          "Engineering Professor",
                          "Research Scientist",
                          "Principal Engineer",
                          "Technical Director"
                        ]
                      }
                    }
                  ]
                }
              ]
            },
            {
              id: "paramed_jobs_dmlt",
              label: "Lab Technician",
              description: "Employment in hospitals and diagnostic labs. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
              details: {
                about: "Run diagnostic tests, manage blood banks, and analyze samples.",
                duration: "3-4 Years",
                fees: "N/A",
                jobs: [
                  "Hospital Lab Technician",
                  "Diagnostic Center Technician",
                  "Blood Collection Technician",
                  "Sample Processing Tech"
                ]
              }
            }
          ]
        },
        {
          id: "radiology",
          label: "Radiology",
          description: "Diploma in Radiology and Imaging Technology. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
          details: {
            duration: "2 Years",
            about: "This is a comprehensive program focused on Radiology. It prepares students for advanced careers and deep academic understanding in the field.",
            fees: "₹50,000 - ₹3,000,000 per year",
            subjects: [
              "Core Theory",
              "Advanced Practicals",
              "Industry Case Studies",
              "Research Methodology"
            ],
            exams: [
              "National Level Entrance",
              "State CET",
              "University Specific Exams"
            ],
            colleges: [
              "Top Tier National Institutes",
              "Premium State Universities",
              "Reputed Private Colleges"
            ],
            jobs: [
              "X-Ray Technician",
              "CT Scan Operator",
              "MRI Technician",
              "Diagnostic Imaging Assistant"
            ],
            eligibility: {
              minMarks: "50% in 10+2 (PCB)",
              minMarksReserved: "45% in 10+2 (PCB)",
              ageLimit: "17 – 35 years",
              eligibility: "Must have passed 10+2 with Physics, Chemistry & Biology from a recognized board",
              reservation: [
                { category: "General", quota: "50% seats", relaxation: "No relaxation" },
                { category: "OBC", quota: "27% seats", relaxation: "5% marks relaxation" },
                { category: "SC", quota: "15% seats", relaxation: "10% marks relaxation" },
                { category: "ST", quota: "7.5% seats", relaxation: "10% marks relaxation" },
                { category: "EWS", quota: "10% seats", relaxation: "5% marks relaxation" }
              ]
            }
          },
          children: [
            {
              id: "bsc_paramed_rad",
              label: "B.Sc Radiology",
              description: "Bachelor's degree in allied health. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
              details: {
                duration: "3 Years",
                about: "This is a comprehensive program focused on B.Sc Radiology. It prepares students for advanced careers and deep academic understanding in the field.",
                fees: "₹50,000 - ₹3,000,000 per year",
                subjects: [
                  "Core Theory",
                  "Advanced Practicals",
                  "Industry Case Studies",
                  "Research Methodology"
                ],
                exams: [
                  "National Level Entrance",
                  "State CET",
                  "University Specific Exams"
                ],
                colleges: [
                  "Top Tier National Institutes",
                  "Premium State Universities",
                  "Reputed Private Colleges"
                ],
                jobs: [
                  "Radiologic Technologist",
                  "Sonographer / Ultrasound Tech",
                  "MRI Technologist",
                  "Interventional Radiology Technologist"
                ],
                eligibility: {
                  minMarks: "50% in 10+2 (PCB/PCM)",
                  minMarksReserved: "40% in 10+2 (PCB/PCM)",
                  ageLimit: "17 – 35 years",
                  eligibility: "10+2 with Physics, Chemistry & Biology/Maths. Some universities accept Diploma in Radiology holders.",
                  reservation: [
                    { category: "General", quota: "50% seats", relaxation: "No relaxation" },
                    { category: "OBC", quota: "27% seats", relaxation: "5% marks relaxation" },
                    { category: "SC", quota: "15% seats", relaxation: "10% marks relaxation" },
                    { category: "ST", quota: "7.5% seats", relaxation: "10% marks relaxation" },
                    { category: "EWS", quota: "10% seats", relaxation: "5% marks relaxation" }
                  ]
                }
              },
              children: [
                {
                  id: "msc_paramed_rad",
                  label: "M.Sc Radiology",
                  description: "Master's degree in allied health. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
                  details: {
                    duration: "2 Years",
                    about: "This is a comprehensive program focused on M.Sc Radiology. It prepares students for advanced careers and deep academic understanding in the field.",
                    fees: "₹50,000 - ₹3,000,000 per year",
                    subjects: [
                      "Core Theory",
                      "Advanced Practicals",
                      "Industry Case Studies",
                      "Research Methodology"
                    ],
                    exams: [
                      "National Level Entrance",
                      "State CET",
                      "University Specific Exams"
                    ],
                    colleges: [
                      "Top Tier National Institutes",
                      "Premium State Universities",
                      "Reputed Private Colleges"
                    ],
                    jobs: [
                      "Senior Radiologist",
                      "Radiation Safety Officer",
                      "Clinical Research Coordinator",
                      "Radiology Lab Manager"
                    ],
                    eligibility: {
                      minMarks: "55% in B.Sc Radiology / Allied Health",
                      minMarksReserved: "50% in B.Sc Radiology / Allied Health",
                      ageLimit: "No upper limit (typically)",
                      eligibility: "B.Sc in Radiology or Imaging Technology from a recognized university",
                      reservation: [
                        { category: "General", quota: "50% seats", relaxation: "No relaxation" },
                        { category: "OBC", quota: "27% seats", relaxation: "5% marks relaxation" },
                        { category: "SC", quota: "15% seats", relaxation: "5% marks relaxation" },
                        { category: "ST", quota: "7.5% seats", relaxation: "5% marks relaxation" },
                        { category: "EWS", quota: "10% seats", relaxation: "5% marks relaxation" }
                      ]
                    }
                  },
                  children: [
                    {
                      id: "phd_paramed_rad",
                      label: "Ph.D",
                      description: "Doctorate in clinical research. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
                      details: {
                        duration: "3-5 Years",
                        about: "This is a comprehensive program focused on Ph.D. It prepares students for advanced careers and deep academic understanding in the field.",
                        fees: "Funded / ₹50K - ₹2L per year",
                        subjects: [
                          "Core Theory",
                          "Advanced Practicals",
                          "Industry Case Studies",
                          "Research Methodology"
                        ],
                        exams: [
                          "UGC NET",
                          "CSIR NET",
                          "Institute Specific Entrance"
                        ],
                        colleges: [
                          "Top Tier National Institutes",
                          "Premium State Universities",
                          "Reputed Private Colleges"
                        ],
                        jobs: [
                          "Radiology Professor",
                          "Medical Imaging Researcher",
                          "Chief Radiologist",
                          "Radiology Consultant"
                        ],
                        eligibility: {
                          minMarks: "60% in M.Sc Radiology or equivalent",
                          minMarksReserved: "55% in M.Sc Radiology or equivalent",
                          ageLimit: "No upper limit",
                          eligibility: "M.Sc in Radiology/Imaging Technology with research aptitude. UGC NET/CSIR NET may be required.",
                          reservation: [
                            { category: "General", quota: "50% seats", relaxation: "No relaxation" },
                            { category: "OBC", quota: "27% seats", relaxation: "5% marks relaxation" },
                            { category: "SC", quota: "15% seats", relaxation: "5% marks relaxation" },
                            { category: "ST", quota: "7.5% seats", relaxation: "5% marks relaxation" },
                            { category: "EWS", quota: "10% seats", relaxation: "5% marks relaxation" }
                          ]
                        }
                      }
                    }
                  ]
                }
              ]
            },
            {
              id: "paramed_jobs_rad",
              label: "Radiology Technician",
              description: "Employment in hospitals and diagnostic labs. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
              details: {
                about: "Operate X-Ray, MRI, and CT scan machines.",
                duration: "3-4 Years",
                fees: "N/A",
                jobs: [
                  "Hospital X-Ray Technician",
                  "CT / MRI Machine Operator",
                  "Diagnostic Lab Technician",
                  "Radiology Department Assistant"
                ]
              }
            }
          ]
        },
        {
          id: "ophthalmic",
          label: "Ophthalmic",
          description: "Diploma in Ophthalmic Technology. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
          details: {
            duration: "2 Years",
            about: "This is a comprehensive program focused on Ophthalmic. It prepares students for advanced careers and deep academic understanding in the field.",
            fees: "₹50,000 - ₹3,000,000 per year",
            subjects: [
              "Core Theory",
              "Advanced Practicals",
              "Industry Case Studies",
              "Research Methodology"
            ],
            exams: [
              "National Level Entrance",
              "State CET",
              "University Specific Exams"
            ],
            colleges: [
              "Top Tier National Institutes",
              "Premium State Universities",
              "Reputed Private Colleges"
            ],
            jobs: [
              "Eye Care Technician",
              "Refractionist",
              "Optical Dispenser",
              "Vision Therapist"
            ]
          },
          children: [
            {
              id: "bsc_paramed_oph",
              label: "B.Sc Optometry",
              description: "Bachelor's degree in allied health. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
              details: {
                duration: "3 Years",
                about: "This is a comprehensive program focused on B.Sc Optometry. It prepares students for advanced careers and deep academic understanding in the field.",
                fees: "₹50,000 - ₹3,000,000 per year",
                subjects: [
                  "Core Theory",
                  "Advanced Practicals",
                  "Industry Case Studies",
                  "Research Methodology"
                ],
                exams: [
                  "National Level Entrance",
                  "State CET",
                  "University Specific Exams"
                ],
                colleges: [
                  "Top Tier National Institutes",
                  "Premium State Universities",
                  "Reputed Private Colleges"
                ],
                jobs: [
                  "Optometrist",
                  "Contact Lens Specialist",
                  "Low Vision Specialist",
                  "Optical Store Manager"
                ]
              },
              children: [
                {
                  id: "msc_paramed_oph",
                  label: "M.Sc Optometry",
                  description: "Master's degree in allied health. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
                  details: {
                    duration: "2 Years",
                    about: "This is a comprehensive program focused on M.Sc Optometry. It prepares students for advanced careers and deep academic understanding in the field.",
                    fees: "₹50,000 - ₹3,000,000 per year",
                    subjects: [
                      "Core Theory",
                      "Advanced Practicals",
                      "Industry Case Studies",
                      "Research Methodology"
                    ],
                    exams: [
                      "National Level Entrance",
                      "State CET",
                      "University Specific Exams"
                    ],
                    colleges: [
                      "Top Tier National Institutes",
                      "Premium State Universities",
                      "Reputed Private Colleges"
                    ],
                    jobs: [
                      "Senior Optometrist",
                      "Clinical Research (Eye Care)",
                      "Optometry Lecturer",
                      "Pediatric Optometrist"
                    ]
                  },
                  children: [
                    {
                      id: "phd_paramed_oph",
                      label: "Ph.D",
                      description: "Doctorate in clinical research. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
                      details: {
                        duration: "3-5 Years",
                        about: "This is a comprehensive program focused on Ph.D. It prepares students for advanced careers and deep academic understanding in the field.",
                        fees: "Funded / ₹50K - ₹2L per year",
                        subjects: [
                          "Core Theory",
                          "Advanced Practicals",
                          "Industry Case Studies",
                          "Research Methodology"
                        ],
                        exams: [
                          "UGC NET",
                          "CSIR NET",
                          "Institute Specific Entrance"
                        ],
                        colleges: [
                          "Top Tier National Institutes",
                          "Premium State Universities",
                          "Reputed Private Colleges"
                        ],
                        jobs: [
                          "Engineering Professor",
                          "Research Scientist",
                          "Principal Engineer",
                          "Technical Director"
                        ]
                      }
                    }
                  ]
                }
              ]
            },
            {
              id: "paramed_jobs_oph",
              label: "Ophthalmic Technician",
              description: "Employment in hospitals and eye clinics. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
              details: {
                about: "Assist ophthalmologists and perform vision tests.",
                duration: "3-4 Years",
                fees: "N/A",
                jobs: [
                  "Eye Hospital Technician",
                  "OPD Eye Assistant",
                  "Optical Lab Technician",
                  "Eye Camp Coordinator"
                ]
              }
            }
          ]
        }
      ]
    },
    {
      id: "vocational",
      label: "Short-term Vocational",
      description: "Skill-based training and certification programs. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
      details: {
        about: "Job-ready courses aimed at specific industries like tourism, hospitality, and animation.",
        duration: "6 Months - 2 Years",
        fees: "₹50,000 - ₹3,000,000 per year",
        subjects: [
          "Core Theory",
          "Advanced Practicals",
          "Industry Case Studies",
          "Research Methodology"
        ],
        exams: [
          "National Level Entrance",
          "State CET",
          "University Specific Exams"
        ],
        colleges: [
          "Top Tier National Institutes",
          "Premium State Universities",
          "Reputed Private Colleges"
        ],
        jobs: [
          "Tour Guide",
          "Salon Manager",
          "VFX Artist",
          "Event Coordinator"
        ]
      },
      children: [
        {
          id: "tourism",
          label: "Travel & Tourism",
          description: "Diploma in Travel and Hospitality. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
          details: {
            duration: "1 Year",
            about: "This is a comprehensive program focused on Travel & Tourism. It prepares students for advanced careers and deep academic understanding in the field.",
            fees: "₹50,000 - ₹3,000,000 per year",
            subjects: [
              "Core Theory",
              "Advanced Practicals",
              "Industry Case Studies",
              "Research Methodology"
            ],
            exams: [
              "National Level Entrance",
              "State CET",
              "University Specific Exams"
            ],
            colleges: [
              "Top Tier National Institutes",
              "Premium State Universities",
              "Reputed Private Colleges"
            ],
            jobs: [
              "Travel Agent",
              "Tour Guide",
              "Airport Ground Staff",
              "Travel Coordinator"
            ]
          },
          children: [
            {
              id: "bvoc_tourism",
              label: "B.Voc (Tourism)",
              description: "Bachelor of Vocation. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
              details: {
                duration: "3 Years",
                about: "This is a comprehensive program focused on B.Voc (Tourism). It prepares students for advanced careers and deep academic understanding in the field.",
                fees: "₹50,000 - ₹3,000,000 per year",
                subjects: [
                  "Core Theory",
                  "Advanced Practicals",
                  "Industry Case Studies",
                  "Research Methodology"
                ],
                exams: [
                  "National Level Entrance",
                  "State CET",
                  "University Specific Exams"
                ],
                colleges: [
                  "Top Tier National Institutes",
                  "Premium State Universities",
                  "Reputed Private Colleges"
                ],
                jobs: [
                  "Tourism Officer",
                  "Hotel Manager",
                  "Event Planner",
                  "Travel Consultant"
                ]
              },
              children: [
                {
                  id: "mvoc_tourism",
                  label: "M.Voc / MBA",
                  description: "Master's in Tourism/Hospitality. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
                  details: {
                    duration: "2 Years",
                    about: "This is a comprehensive program focused on M.Voc / MBA. It prepares students for advanced careers and deep academic understanding in the field.",
                    fees: "₹50,000 - ₹3,000,000 per year",
                    subjects: [
                      "Core Theory",
                      "Advanced Practicals",
                      "Industry Case Studies",
                      "Research Methodology"
                    ],
                    exams: [
                      "National Level Entrance",
                      "State CET",
                      "University Specific Exams"
                    ],
                    colleges: [
                      "Top Tier National Institutes",
                      "Premium State Universities",
                      "Reputed Private Colleges"
                    ],
                    jobs: [
                      "Tourism Director",
                      "Hospitality Consultant",
                      "Resort General Manager",
                      "Airline Manager"
                    ]
                  }
                }
              ]
            },
            {
              id: "job_tourism",
              label: "Hospitality Professional",
              description: "Work in hotels, airlines, or travel agencies. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
              details: {
                about: "This is a comprehensive program focused on Hospitality Professional. It prepares students for advanced careers and deep academic understanding in the field.",
                duration: "3-4 Years",
                fees: "N/A",
                jobs: [
                  "Front Desk Executive",
                  "F&B Manager",
                  "Housekeeping Supervisor",
                  "Guest Relations Manager"
                ]
              }
            }
          ]
        },
        {
          id: "beauty",
          label: "Beauty & Wellness",
          description: "Diploma in Cosmetology. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
          details: {
            duration: "6 Months - 1 Year",
            about: "This is a comprehensive program focused on Beauty & Wellness. It prepares students for advanced careers and deep academic understanding in the field.",
            fees: "₹50,000 - ₹3,000,000 per year",
            subjects: [
              "Core Theory",
              "Advanced Practicals",
              "Industry Case Studies",
              "Research Methodology"
            ],
            exams: [
              "National Level Entrance",
              "State CET",
              "University Specific Exams"
            ],
            colleges: [
              "Top Tier National Institutes",
              "Premium State Universities",
              "Reputed Private Colleges"
            ],
            jobs: [
              "Hair Stylist",
              "Makeup Artist",
              "Spa Therapist",
              "Nail Technician"
            ]
          },
          children: [
            {
              id: "bvoc_beauty",
              label: "B.Voc (Beauty)",
              description: "Bachelor of Vocation. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
              details: {
                duration: "3 Years",
                about: "This is a comprehensive program focused on B.Voc (Beauty). It prepares students for advanced careers and deep academic understanding in the field.",
                fees: "₹50,000 - ₹3,000,000 per year",
                subjects: [
                  "Core Theory",
                  "Advanced Practicals",
                  "Industry Case Studies",
                  "Research Methodology"
                ],
                exams: [
                  "National Level Entrance",
                  "State CET",
                  "University Specific Exams"
                ],
                colleges: [
                  "Top Tier National Institutes",
                  "Premium State Universities",
                  "Reputed Private Colleges"
                ],
                jobs: [
                  "Salon Manager",
                  "Beauty Trainer",
                  "Cosmetics Consultant",
                  "Wellness Center Manager"
                ]
              },
              children: [
                {
                  id: "mvoc_beauty",
                  label: "M.Voc",
                  description: "Master of Vocation. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
                  details: {
                    duration: "2 Years",
                    about: "This is a comprehensive program focused on M.Voc. It prepares students for advanced careers and deep academic understanding in the field.",
                    fees: "₹50,000 - ₹3,000,000 per year",
                    subjects: [
                      "Core Theory",
                      "Advanced Practicals",
                      "Industry Case Studies",
                      "Research Methodology"
                    ],
                    exams: [
                      "National Level Entrance",
                      "State CET",
                      "University Specific Exams"
                    ],
                    colleges: [
                      "Top Tier National Institutes",
                      "Premium State Universities",
                      "Reputed Private Colleges"
                    ],
                    jobs: [
                      "Beauty Industry Consultant",
                      "Product Development (Cosmetics)",
                      "Wellness Director",
                      "Beauty Academy Director"
                    ]
                  }
                }
              ]
            },
            {
              id: "job_beauty",
              label: "Cosmetologist / Stylist",
              description: "Work in premium salons or start a business. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
              details: {
                about: "This is a comprehensive program focused on Cosmetologist / Stylist. It prepares students for advanced careers and deep academic understanding in the field.",
                duration: "3-4 Years",
                fees: "N/A",
                jobs: [
                  "Celebrity Stylist",
                  "Film/TV Makeup Artist",
                  "Salon Owner",
                  "Brand Ambassador (Beauty)"
                ]
              }
            }
          ]
        },
        {
          id: "animation",
          label: "Animation & VFX",
          description: "Diploma in Multimedia. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
          details: {
            duration: "1-2 Years",
            exams: [
              "Institute specific exams"
            ],
            colleges: [
              "Arena Animation",
              "MAAC"
            ],
            about: "This is a comprehensive program focused on Animation & VFX. It prepares students for advanced careers and deep academic understanding in the field.",
            fees: "₹50,000 - ₹3,000,000 per year",
            subjects: [
              "Core Theory",
              "Advanced Practicals",
              "Industry Case Studies",
              "Research Methodology"
            ],
            jobs: [
              "2D Animator",
              "Motion Graphics Artist",
              "VFX Compositor",
              "Storyboard Artist"
            ]
          },
          children: [
            {
              id: "bsc_animation",
              label: "B.Sc / B.Voc (Animation)",
              description: "Bachelor's degree in VFX/Animation. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
              details: {
                duration: "3 Years",
                about: "This is a comprehensive program focused on B.Sc / B.Voc (Animation). It prepares students for advanced careers and deep academic understanding in the field.",
                fees: "₹50,000 - ₹3,000,000 per year",
                subjects: [
                  "Core Theory",
                  "Advanced Practicals",
                  "Industry Case Studies",
                  "Research Methodology"
                ],
                exams: [
                  "National Level Entrance",
                  "State CET",
                  "University Specific Exams"
                ],
                colleges: [
                  "Top Tier National Institutes",
                  "Premium State Universities",
                  "Reputed Private Colleges"
                ],
                jobs: [
                  "3D Animator",
                  "Game Designer",
                  "VFX Artist",
                  "Character Designer"
                ]
              },
              children: [
                {
                  id: "msc_animation",
                  label: "M.Sc Animation",
                  description: "Master's degree. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
                  details: {
                    duration: "2 Years",
                    about: "This is a comprehensive program focused on M.Sc Animation. It prepares students for advanced careers and deep academic understanding in the field.",
                    fees: "₹50,000 - ₹3,000,000 per year",
                    subjects: [
                      "Core Theory",
                      "Advanced Practicals",
                      "Industry Case Studies",
                      "Research Methodology"
                    ],
                    exams: [
                      "National Level Entrance",
                      "State CET",
                      "University Specific Exams"
                    ],
                    colleges: [
                      "Top Tier National Institutes",
                      "Premium State Universities",
                      "Reputed Private Colleges"
                    ],
                    jobs: [
                      "Animation Director",
                      "VFX Supervisor",
                      "Creative Head (Animation Studio)",
                      "Technical Director"
                    ]
                  }
                }
              ]
            },
            {
              id: "job_animation",
              label: "VFX Artist / Animator",
              description: "Work in film, gaming, or advertising industries. This comprehensive curriculum is designed to equip students with advanced theoretical knowledge and practical industry skills.",
              details: {
                about: "This is a comprehensive program focused on VFX Artist / Animator. It prepares students for advanced careers and deep academic understanding in the field.",
                duration: "2 Years",
                fees: "N/A",
                jobs: [
                  "Freelance Animator",
                  "Film VFX Artist",
                  "Game Developer",
                  "AR/VR Content Creator"
                ]
              }
            }
          ]
        }
      ]
    }
  ]
};
