export interface CareerNode {
  id: string;
  label: string;
  description?: string;
  children?: CareerNode[];
}

export const post10thCareerMap: CareerNode = {
  id: "10th",
  label: "10th Grade",
  description: "Your foundational step. Choose your path wisely!",
  children: [
    {
      id: "intermediate",
      label: "Intermediate (10+2)",
      description: "2-year pre-university courses",
      children: [
        {
          id: "mpc",
          label: "MPC (Maths, Physics, Chem)",
          children: [
            { id: "btech", label: "Engineering (B.Tech/B.E)" },
            { id: "barch", label: "Architecture (B.Arch)" },
            { id: "nda", label: "NDA (Defense Services)" },
            { id: "bsc_maths", label: "B.Sc (Mathematics/Physics)" }
          ]
        },
        {
          id: "bipc",
          label: "BiPC (Bio, Physics, Chem)",
          children: [
            { id: "mbbs", label: "Medicine (MBBS/BDS)" },
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
