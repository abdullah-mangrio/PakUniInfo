// universitySeed.js
// Seed script for PakUniInfo – inserts ~100 Pakistani universities

import mongoose from "mongoose";
import dotenv from "dotenv";
import University from "./models/University.js";

dotenv.config();

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/pakuniinfo";

const universities = [
  // =========================
  // ISLAMABAD (FEDERAL AREA)
  // =========================

  // 1
  {
    name: "Quaid-i-Azam University (QAU)",
    city: "Islamabad",
    province: "Islamabad",
    location: "QAU Campus, Islamabad",
    website: "https://qau.edu.pk",
    programs: ["BSCS", "BBA", "BS Economics"],
    description:
      "Public research university in Islamabad offering programmes in natural sciences, social sciences and humanities.",
  },
  // 2
  {
    name: "National University of Sciences and Technology (NUST)",
    city: "Islamabad",
    province: "Islamabad",
    location: "Sector H-12, Islamabad",
    website: "https://nust.edu.pk",
    programs: ["BSCS", "BSEE", "BS Mechanical", "BBA"],
    description:
      "Multi-campus public research university known for engineering, computing, natural sciences and business programmes.",
  },
  // 3
  {
    name: "COMSATS University Islamabad (CUI)",
    city: "Islamabad",
    province: "Islamabad",
    location: "Park Road, Tarlai Kalan, Islamabad",
    website: "https://www.comsats.edu.pk",
    programs: ["BSCS", "BSIT", "BBA"],
    description:
      "Public university focused on information technology, engineering and management with campuses across Pakistan.",
  },
  // 4
  {
    name: "International Islamic University Islamabad (IIUI)",
    city: "Islamabad",
    province: "Islamabad",
    location: "Sector H-10, Islamabad",
    website: "https://www.iiu.edu.pk",
    programs: ["BSCS", "BBA", "BS Islamic Studies"],
    description:
      "Public sector university offering programmes in Islamic studies, social sciences, management and technology.",
  },
  // 5
  {
    name: "Allama Iqbal Open University (AIOU)",
    city: "Islamabad",
    province: "Islamabad",
    location: "H-8, Islamabad",
    website: "https://www.aiou.edu.pk",
    programs: ["BSCS", "BBA", "BA"],
    description:
      "Pakistan’s largest distance-learning public university, offering flexible study options across many disciplines.",
  },
  // 6
  {
    name: "Pakistan Institute of Engineering and Applied Sciences (PIEAS)",
    city: "Islamabad",
    province: "Islamabad",
    location: "Nilore, Islamabad",
    website: "https://pieas.edu.pk",
    programs: ["BSCS", "BSEE", "BS Mechanical"],
    description:
      "Public research university specialising in engineering, nuclear sciences and applied sciences.",
  },
  // 7
  {
    name: "Bahria University Islamabad",
    city: "Islamabad",
    province: "Islamabad",
    location: "Shangrila Road, E-8, Islamabad",
    website: "https://www.bahria.edu.pk",
    programs: ["BSCS", "BBA", "BSEE"],
    description:
      "Public sector university run by the Pakistan Navy offering programmes in management, IT, engineering and health sciences.",
  },
  // 8
  {
    name: "Riphah International University Islamabad",
    city: "Islamabad",
    province: "Islamabad",
    location: "I-14, Islamabad",
    website: "https://riphah.edu.pk",
    programs: ["BSCS", "BBA", "MBBS"],
    description:
      "Private university with a strong focus on medical, engineering, management and social sciences programmes.",
  },
  // 9
  {
    name: "Capital University of Science and Technology (CUST)",
    city: "Islamabad",
    province: "Islamabad",
    location: "Islamabad Expressway, Islamabad",
    website: "https://cust.edu.pk",
    programs: ["BSCS", "BSEE", "BBA"],
    description:
      "Private university in Islamabad offering programmes in engineering, computing and management sciences.",
  },
  // 10
  {
    name: "Air University Islamabad",
    city: "Islamabad",
    province: "Islamabad",
    location: "E-9, Islamabad",
    website: "https://www.au.edu.pk",
    programs: ["BSCS", "BSEE", "BBA"],
    description:
      "Public sector university established by the Pakistan Air Force, offering programmes in engineering, computing and management.",
  },
  // 11
  {
    name: "Institute of Space Technology (IST)",
    city: "Islamabad",
    province: "Islamabad",
    location: "Islamabad Highway, Islamabad",
    website: "https://www.ist.edu.pk",
    programs: ["BSCS", "BSEE", "BS Aerospace"],
    description:
      "Public university specialising in space science, aerospace, avionics and related engineering disciplines.",
  },
  // 12
  {
    name: "National University of Computer and Emerging Sciences (FAST-NU), Islamabad",
    city: "Islamabad",
    province: "Islamabad",
    location: "A.K. Brohi Road, H-11/4, Islamabad",
    website: "https://www.nu.edu.pk",
    programs: ["BSCS", "BSSE", "BBA"],
    description:
      "Private university widely known for strong computer science and software engineering programmes.",
  },
  // 13
  {
    name: "Shifa Tameer-e-Millat University",
    city: "Islamabad",
    province: "Islamabad",
    location: "H-8/4, Islamabad",
    website: "https://stmu.edu.pk",
    programs: ["MBBS", "BSc Nursing", "BSCS"],
    description:
      "Private university centred on health sciences and allied disciplines, with its own teaching hospital.",
  },
  // 14
  {
    name: "National University of Technology (NUTECH)",
    city: "Islamabad",
    province: "Islamabad",
    location: "I-12, Islamabad",
    website: "https://nutech.edu.pk",
    programs: ["BSCS", "BSEE", "BS Mechanical"],
    description:
      "Public university focused on applied engineering and technology education with an industry-linked model.",
  },

  // ==========
  // PUNJAB
  // ==========

  // 15
  {
    name: "University of the Punjab (PU)",
    city: "Lahore",
    province: "Punjab",
    location: "Quaid-e-Azam Campus, Canal Road, Lahore",
    website: "https://pu.edu.pk",
    programs: ["BSCS", "BBA", "BS Economics"],
    description:
      "One of Pakistan’s oldest and largest public universities, offering a wide range of undergraduate and postgraduate programmes.",
  },
  // 16
  {
    name: "University of Engineering and Technology (UET) Lahore",
    city: "Lahore",
    province: "Punjab",
    location: "G.T. Road, Lahore",
    website: "https://www.uet.edu.pk",
    programs: ["BSCS", "BSEE", "BS Mechanical"],
    description:
      "Public engineering university known for programmes in civil, electrical, mechanical, computer and other engineering fields.",
  },
  // 17
  {
    name: "Government College University (GCU) Lahore",
    city: "Lahore",
    province: "Punjab",
    location: "Katchery Road, Lahore",
    website: "https://www.gcu.edu.pk",
    programs: ["BSCS", "BSc", "BA"],
    description:
      "Historic public university with strengths in sciences, arts and social sciences.",
  },
  // 18
  {
    name: "Lahore College for Women University (LCWU)",
    city: "Lahore",
    province: "Punjab",
    location: "Jail Road, Lahore",
    website: "https://www.lcwu.edu.pk",
    programs: ["BSCS", "BBA", "BS Fine Arts"],
    description:
      "Public women’s university in Lahore offering programmes in sciences, arts and professional disciplines.",
  },
  // 19
  {
    name: "Kinnaird College for Women University",
    city: "Lahore",
    province: "Punjab",
    location: "Jail Road, Lahore",
    website: "https://www.kinnaird.edu.pk",
    programs: ["BSCS", "BBA", "BS Economics"],
    description:
      "Autonomous women’s institution in Lahore known for humanities, social sciences and business programmes.",
  },
  // 20
  {
    name: "King Edward Medical University (KEMU)",
    city: "Lahore",
    province: "Punjab",
    location: "Nila Gumbad, Lahore",
    website: "https://kemu.edu.pk",
    programs: ["MBBS", "BSc Allied Health"],
    description:
      "One of the oldest medical institutions in South Asia, offering MBBS and allied health programmes.",
  },
  // 21
  {
    name: "Fatima Jinnah Medical University (FJMU)",
    city: "Lahore",
    province: "Punjab",
    location: "Queen’s Road, Lahore",
    website: "https://fjmu.edu.pk",
    programs: ["MBBS", "BSc Allied Health"],
    description:
      "Public medical university with a focus on medical and health sciences education.",
  },
  // 22
  {
    name: "University of Health Sciences (UHS) Lahore",
    city: "Lahore",
    province: "Punjab",
    location: "Khayaban-e-Jamia Punjab, Lahore",
    website: "https://uhs.edu.pk",
    programs: ["MBBS", "BSc Nursing"],
    description:
      "Public university that regulates and affiliates medical and dental colleges across Punjab.",
  },
  // 23
  {
    name: "Forman Christian College (A Chartered University)",
    city: "Lahore",
    province: "Punjab",
    location: "Ferozepur Road, Lahore",
    website: "https://www.fccollege.edu.pk",
    programs: ["BSCS", "BBA", "BS Economics"],
    description:
      "Chartered university offering liberal arts and sciences education with a strong undergraduate focus.",
  },
  // 24
  {
    name: "National College of Arts (NCA)",
    city: "Lahore",
    province: "Punjab",
    location: "Shahrah-e-Quaid-e-Azam, Lahore",
    website: "https://www.nca.edu.pk",
    programs: ["BS Fine Arts", "BS Design"],
    description:
      "Public institution dedicated to fine arts, design and architecture.",
  },
  // 25
  {
    name: "Information Technology University (ITU) Lahore",
    city: "Lahore",
    province: "Punjab",
    location: "Arfa Software Technology Park, Lahore",
    website: "https://itu.edu.pk",
    programs: ["BSCS", "BSIT"],
    description:
      "Public university with a focus on computer science, data science and emerging technologies.",
  },
  // 26
  {
    name: "Beaconhouse National University (BNU)",
    city: "Lahore",
    province: "Punjab",
    location: "Raiwind Road, Lahore",
    website: "https://www.bnu.edu.pk",
    programs: ["BSCS", "BBA", "BS Media Studies"],
    description:
      "Private liberal arts university focusing on media, arts, design, social sciences and technology.",
  },
  // 27
  {
    name: "University of Management and Technology (UMT)",
    city: "Lahore",
    province: "Punjab",
    location: "C-II Johar Town, Lahore",
    website: "https://www.umt.edu.pk",
    programs: ["BBA", "BSCS", "BSIT"],
    description:
      "Private university offering programmes in management, computing, engineering and social sciences.",
  },
  // 28
  {
    name: "University of Central Punjab (UCP)",
    city: "Lahore",
    province: "Punjab",
    location: "Khayaban-e-Jinnah, Lahore",
    website: "https://ucp.edu.pk",
    programs: ["BBA", "BSCS", "BSIT"],
    description:
      "Private university in Lahore known for business, law, IT and engineering programmes.",
  },
  // 29
  {
    name: "The University of Lahore (UOL)",
    city: "Lahore",
    province: "Punjab",
    location: "Defence Road, Lahore",
    website: "https://uol.edu.pk",
    programs: ["BSCS", "BBA", "MBBS"],
    description:
      "Large private university with multiple campuses and programmes across health, engineering, business and social sciences.",
  },
  // 30
  {
    name: "Superior University, Lahore",
    city: "Lahore",
    province: "Punjab",
    location: "Raiwind Road, Lahore",
    website: "https://www.superior.edu.pk",
    programs: ["BBA", "BSCS", "BSIT"],
    description:
      "Private university with programmes in business, computing, engineering and allied health.",
  },
  // 31
  {
    name: "University of South Asia (USA), Lahore",
    city: "Lahore",
    province: "Punjab",
    location: "Cantt and Raiwind Road campuses, Lahore",
    website: "https://usa.edu.pk",
    programs: ["BBA", "BSCS", "BSIT"],
    description:
      "Private university offering programmes in business, computing, design and engineering.",
  },
  // 32
  {
    name: "Minhaj University Lahore",
    city: "Lahore",
    province: "Punjab",
    location: "Township, Lahore",
    website: "https://www.mul.edu.pk",
    programs: ["BBA", "BSCS", "BS Islamic Studies"],
    description:
      "Private university providing programmes in religious studies, social sciences, management and technology.",
  },
  // 33
  {
    name: "Lahore Garrison University",
    city: "Lahore",
    province: "Punjab",
    location: "DHA Phase VI and Main Campus, Lahore",
    website: "https://lgu.edu.pk",
    programs: ["BSCS", "BSIT", "BBA"],
    description:
      "Chartered university offering programmes in IT, management, social sciences and media studies.",
  },
  // 34
  {
    name: "University of Sargodha",
    city: "Sargodha",
    province: "Punjab",
    location: "University Road, Sargodha",
    website: "https://uos.edu.pk",
    programs: ["BSCS", "BBA", "BS Agriculture"],
    description:
      "Public university with programmes in sciences, agriculture, arts and social sciences.",
  },
  // 35
  {
    name: "The Islamia University of Bahawalpur (IUB)",
    city: "Bahawalpur",
    province: "Punjab",
    location: "Abbasia and Baghdad-ul-Jadeed Campuses, Bahawalpur",
    website: "https://www.iub.edu.pk",
    programs: ["BSCS", "BBA", "BS Agriculture"],
    description:
      "Public university offering a wide range of programmes including agriculture, business, IT and Islamic studies.",
  },
  // 36
  {
    name: "Bahauddin Zakariya University (BZU)",
    city: "Multan",
    province: "Punjab",
    location: "Bosan Road, Multan",
    website: "https://bzu.edu.pk",
    programs: ["BSCS", "BBA", "BS Agriculture"],
    description:
      "Large public university in Multan catering to southern Punjab with diverse academic disciplines.",
  },
  // 37
  {
    name: "University of Gujrat (UoG)",
    city: "Gujrat",
    province: "Punjab",
    location: "Hafiz Hayat Campus, Gujrat",
    website: "https://uog.edu.pk",
    programs: ["BSCS", "BBA", "BS Fine Arts"],
    description:
      "Public university serving central Punjab with programmes in arts, sciences, IT and management.",
  },
  // 38
  {
    name: "PMAS Arid Agriculture University, Rawalpindi",
    city: "Rawalpindi",
    province: "Punjab",
    location: "Shamsabad, Murree Road, Rawalpindi",
    website: "https://uaar.edu.pk",
    programs: ["BS Agriculture", "BSCS", "BSc"],
    description:
      "Public university focused on agriculture, environmental sciences and related fields.",
  },
  // 39
  {
    name: "Fatima Jinnah Women University (FJWU) Rawalpindi",
    city: "Rawalpindi",
    province: "Punjab",
    location: "Mall Road, Rawalpindi",
    website: "https://fjwu.edu.pk",
    programs: ["BSCS", "BBA", "BS Economics"],
    description:
      "Public women’s university located in Rawalpindi with programmes in arts, sciences and social sciences.",
  },
  // 40
  {
    name: "Government College University Faisalabad (GCUF)",
    city: "Faisalabad",
    province: "Punjab",
    location: "Jail Road, Faisalabad",
    website: "https://gcuf.edu.pk",
    programs: ["BSCS", "BBA", "BS Physics"],
    description:
      "Public university offering programmes in natural sciences, social sciences, management and humanities.",
  },
  // 41
  {
    name: "University of Agriculture Faisalabad (UAF)",
    city: "Faisalabad",
    province: "Punjab",
    location: "Main Campus, Faisalabad",
    website: "https://uaf.edu.pk",
    programs: ["BS Agriculture", "BSCS", "BSc"],
    description:
      "Leading agricultural university offering programmes in agriculture, food sciences and related disciplines.",
  },
  // 42
  {
    name: "National Textile University (NTU), Faisalabad",
    city: "Faisalabad",
    province: "Punjab",
    location: "Sheikhupura Road, Faisalabad",
    website: "https://www.ntu.edu.pk",
    programs: ["BS Textile", "BSCS"],
    description:
      "Public university specialising in textile engineering, fashion design and related fields.",
  },
  // 43
  {
    name: "The University of Faisalabad (TUF)",
    city: "Faisalabad",
    province: "Punjab",
    location: "Sargodha Road and Saleemi Chowk Campuses, Faisalabad",
    website: "https://tuf.edu.pk",
    programs: ["BSCS", "BBA", "MBBS"],
    description:
      "Private university offering engineering, business, health sciences and social sciences programmes.",
  },
  // 44
  {
    name: "Khwaja Fareed University of Engineering and Information Technology (KFUEIT)",
    city: "Rahim Yar Khan",
    province: "Punjab",
    location: "Abu Dhabi Road, Rahim Yar Khan",
    website: "https://kfueit.edu.pk",
    programs: ["BSCS", "BSEE", "BS Mechanical"],
    description:
      "Public engineering and technology university serving South Punjab.",
  },
  // 45
  {
    name: "University of Sialkot",
    city: "Sialkot",
    province: "Punjab",
    location: "Daska Road, Sialkot",
    website: "https://uskt.edu.pk",
    programs: ["BSCS", "BBA", "BSIT"],
    description:
      "Private university offering programmes in management, computing, languages and social sciences.",
  },
  // 46
  {
    name: "University of Chakwal",
    city: "Chakwal",
    province: "Punjab",
    location: "Chakwal, Punjab",
    website: "https://uoc.edu.pk",
    programs: ["BSCS", "BBA", "BS Physics"],
    description:
      "Public sector university in Chakwal offering a range of undergraduate programmes.",
  },
  // 47
  {
    name: "University of Mianwali",
    city: "Mianwali",
    province: "Punjab",
    location: "Mianwali, Punjab",
    website: "https://umw.edu.pk",
    programs: ["BSCS", "BBA", "BS Mathematics"],
    description:
      "Emerging public university in Mianwali providing programmes in sciences and humanities.",
  },
  // 48
  {
    name: "Government College Women University, Faisalabad",
    city: "Faisalabad",
    province: "Punjab",
    location: "Madina Town, Faisalabad",
    website: "https://gcwuf.edu.pk",
    programs: ["BSCS", "BBA", "BS Zoology"],
    description:
      "Public women’s university offering programmes in sciences, arts and management.",
  },
  // 49
  {
    name: "University of Education, Lahore",
    city: "Lahore",
    province: "Punjab",
    location: "Township, Lahore",
    website: "https://ue.edu.pk",
    programs: ["BEd", "BSCS", "BBA"],
    description:
      "Public university specialising in teacher education with multiple campuses across Punjab.",
  },
  // 50
  {
    name: "University of Engineering and Technology (UET) Taxila",
    city: "Taxila",
    province: "Punjab",
    location: "UET Taxila Campus, Taxila",
    website: "https://web.uettaxila.edu.pk",
    programs: ["BSCS", "BSEE", "BS Mechanical"],
    description:
      "Public engineering university with programmes in electrical, civil, mechanical and related disciplines.",
  },

  // ========
  // SINDH
  // ========

  // 51
  {
    name: "University of Karachi (KU)",
    city: "Karachi",
    province: "Sindh",
    location: "University Road, Karachi",
    website: "https://www.uok.edu.pk",
    programs: ["BSCS", "BSc", "BA"],
    description:
      "Large public research university in Karachi offering programmes in sciences, arts, social sciences and professional fields.",
  },
  // 52
  {
    name: "NED University of Engineering and Technology",
    city: "Karachi",
    province: "Sindh",
    location: "University Road, Karachi",
    website: "https://www.neduet.edu.pk",
    programs: ["BSCS", "BSEE", "BS Mechanical"],
    description:
      "Public engineering university known for civil, mechanical, electrical and computer engineering programmes.",
  },
  // 53
  {
    name: "Dow University of Health Sciences (DUHS)",
    city: "Karachi",
    province: "Sindh",
    location: "Ojha and Baba-e-Urdu Road campuses, Karachi",
    website: "https://www.duhs.edu.pk",
    programs: ["MBBS", "BDS", "BSc Nursing"],
    description:
      "Public medical university offering MBBS, dentistry and allied health programmes.",
  },
  // 54
  {
    name: "Jinnah Sindh Medical University (JSMU)",
    city: "Karachi",
    province: "Sindh",
    location: "Rafiqui H.J. Shaheed Road, Karachi",
    website: "https://jsmu.edu.pk",
    programs: ["MBBS", "BSc Nursing"],
    description:
      "Public medical university offering medical and health sciences education.",
  },
  // 55
  {
    name: "Institute of Business Administration (IBA) Karachi",
    city: "Karachi",
    province: "Sindh",
    location: "University Road and City Campus, Karachi",
    website: "https://www.iba.edu.pk",
    programs: ["BBA", "BS Economics", "BSCS"],
    description:
      "Public university and one of Pakistan’s leading business schools, also offering programmes in CS and social sciences.",
  },
  // 56
  {
    name: "Shaheed Zulfikar Ali Bhutto Institute of Science and Technology (SZABIST), Karachi",
    city: "Karachi",
    province: "Sindh",
    location: "Clifton, Karachi",
    website: "https://szabist.edu.pk",
    programs: ["BBA", "BSCS", "BS Media Sciences"],
    description:
      "Private university offering programmes in business, computing, media and social sciences.",
  },
  // 57
  {
    name: "Hamdard University",
    city: "Karachi",
    province: "Sindh",
    location: "Madinat al-Hikmah, Karachi",
    website: "https://hamdard.edu.pk",
    programs: ["BSCS", "BBA", "MBBS"],
    description:
      "Private university with programmes in health sciences, engineering, management and social sciences.",
  },
  // 58
  {
    name: "Sir Syed University of Engineering and Technology (SSUET)",
    city: "Karachi",
    province: "Sindh",
    location: "Gulshan-e-Iqbal, Karachi",
    website: "https://www.ssuet.edu.pk",
    programs: ["BSCS", "BSEE", "BSIT"],
    description:
      "Private engineering university focused on electrical engineering, computer engineering and IT.",
  },
  // 59
  {
    name: "Dawood University of Engineering and Technology (DUET)",
    city: "Karachi",
    province: "Sindh",
    location: "New M.A. Jinnah Road, Karachi",
    website: "https://www.duet.edu.pk",
    programs: ["BSCS", "BSEE", "BS Mechanical"],
    description:
      "Public sector engineering university in Karachi with core engineering programmes.",
  },
  // 60
  {
    name: "Benazir Bhutto Shaheed University, Lyari (BBSUL)",
    city: "Karachi",
    province: "Sindh",
    location: "Lyari, Karachi",
    website: "https://bbsul.edu.pk",
    programs: ["BSCS", "BSIT", "BBA"],
    description:
      "Public university in Lyari providing programmes in business, computing and social sciences.",
  },
  // 61
  {
    name: "Federal Urdu University of Arts, Science & Technology (FUUAST), Karachi",
    city: "Karachi",
    province: "Sindh",
    location: "Abdul Haq Campus, Karachi",
    website: "https://fuuast.edu.pk",
    programs: ["BSCS", "BSc", "BA"],
    description:
      "Public university offering programmes in Urdu and English medium across arts, sciences and commerce.",
  },
  // 62
  {
    name: "University of Sindh, Jamshoro",
    city: "Jamshoro",
    province: "Sindh",
    location: "Allama I.I. Kazi Campus, Jamshoro",
    website: "https://usindh.edu.pk",
    programs: ["BSCS", "BBA", "BS Education"],
    description:
      "One of the oldest public universities in Sindh, offering programmes in a broad range of disciplines.",
  },
  // 63
  {
    name: "Mehran University of Engineering and Technology (MUET)",
    city: "Jamshoro",
    province: "Sindh",
    location: "Jamshoro, Sindh",
    website: "https://www.muet.edu.pk",
    programs: ["BSCS", "BSEE", "BS Civil"],
    description:
      "Public engineering university known for civil, electrical, mechanical and computer engineering.",
  },
  // 64
  {
    name: "Liaquat University of Medical and Health Sciences (LUMHS)",
    city: "Jamshoro",
    province: "Sindh",
    location: "Jamshoro, Sindh",
    website: "https://www.lumhs.edu.pk",
    programs: ["MBBS", "BDS", "BSc Nursing"],
    description:
      "Public medical university providing medical, dental and allied health education.",
  },
  // 65
  {
    name: "Isra University",
    city: "Hyderabad",
    province: "Sindh",
    location: "Hala Road, Hyderabad",
    website: "https://isra.edu.pk",
    programs: ["MBBS", "BSCS", "BBA"],
    description:
      "Private university with campuses in Hyderabad, Karachi and Islamabad, offering health, engineering and management programmes.",
  },
  // 66
  {
    name: "Sindh Agriculture University (SAU) Tandojam",
    city: "Tandojam",
    province: "Sindh",
    location: "Tandojam, Hyderabad District",
    website: "https://www.sau.edu.pk",
    programs: ["BS Agriculture", "DVM"],
    description:
      "Public agricultural university focusing on crop sciences, animal sciences and related fields.",
  },
  // 67
  {
    name: "Shah Abdul Latif University (SALU)",
    city: "Khairpur",
    province: "Sindh",
    location: "Khairpur, Sindh",
    website: "https://salu.edu.pk",
    programs: ["BSCS", "BBA", "BS English"],
    description:
      "Public university in upper Sindh with programmes in arts, sciences and social sciences.",
  },
  // 68
  {
    name: "Quaid-e-Awam University of Engineering, Science and Technology (QUEST)",
    city: "Nawabshah",
    province: "Sindh",
    location: "Nawabshah (Shaheed Benazirabad)",
    website: "https://www.quest.edu.pk",
    programs: ["BSCS", "BSEE", "BS Mechanical"],
    description:
      "Public engineering university offering programmes in core engineering and technology disciplines.",
  },
  // 69
  {
    name: "Shaheed Benazir Bhutto University, Shaheed Benazirabad",
    city: "Shaheed Benazirabad",
    province: "Sindh",
    location: "Nawabshah / Shaheed Benazirabad, Sindh",
    website: "https://sbbusba.edu.pk",
    programs: ["BSCS", "BBA", "BS Education"],
    description:
      "Public university offering programmes in education, computing and management sciences.",
  },
  // 70
  {
    name: "The University of Larkana",
    city: "Larkana",
    province: "Sindh",
    location: "Larkana, Sindh",
    website: "",
    programs: ["BSCS", "BBA"],
    description:
      "Emerging public university in Larkana providing undergraduate education in multiple disciplines.",
  },
  // 71
  {
    name: "University of Sufism and Modern Sciences, Bhitshah",
    city: "Bhitshah",
    province: "Sindh",
    location: "Bhitshah, Matiari District",
    website: "",
    programs: ["BSCS", "BBA", "BS Islamic Studies"],
    description:
      "Public university combining Sufi studies with modern disciplines in social sciences and technology.",
  },
  // 72
  {
    name: "Sukkur IBA University",
    city: "Sukkur",
    province: "Sindh",
    location: "Airport Road, Sukkur",
    website: "https://iba-suk.edu.pk",
    programs: ["BBA", "BSCS", "BS Accounting & Finance"],
    description:
      "Public sector business and management university, also offering computing and engineering programmes.",
  },
  // 73
  {
    name: "Benazir Bhutto Shaheed University of Technology and Skill Development, Khairpur Mirs",
    city: "Khairpur Mirs",
    province: "Sindh",
    location: "Khairpur Mirs, Sindh",
    website: "",
    programs: ["BSCS", "BSEE", "BSIT"],
    description:
      "Public university focused on technology, vocational and skill-based education.",
  },
  // 74
  {
    name: "Jinnah University for Women",
    city: "Karachi",
    province: "Sindh",
    location: "Nazimabad, Karachi",
    website: "https://www.juw.edu.pk",
    programs: ["BSCS", "BBA", "BS Microbiology"],
    description:
      "Private women’s university in Karachi offering science, arts and management programmes.",
  },
  // 75
  {
    name: "Iqra University, Karachi",
    city: "Karachi",
    province: "Sindh",
    location: "Main Campus: Defence View, Karachi",
    website: "https://iqra.edu.pk",
    programs: ["BBA", "BSCS", "BSIT"],
    description:
      "Private university with multiple campuses, known for business, fashion design, media and computing programmes.",
  },

  // =====================
  // KHYBER PAKHTUNKHWA
  // =====================

  // 76
  {
    name: "University of Peshawar",
    city: "Peshawar",
    province: "KPK",
    location: "University Campus, Peshawar",
    website: "https://www.uop.edu.pk",
    programs: ["BSCS", "BBA", "BS Economics"],
    description:
      "One of the oldest public universities in Khyber Pakhtunkhwa with a wide range of programmes.",
  },
  // 77
  {
    name: "Islamia College University, Peshawar",
    city: "Peshawar",
    province: "KPK",
    location: "University Road, Peshawar",
    website: "https://icp.edu.pk",
    programs: ["BSCS", "BBA", "BSc"],
    description:
      "Historic institution offering undergraduate programmes in sciences, humanities and management.",
  },
  // 78
  {
    name: "University of Engineering and Technology (UET) Peshawar",
    city: "Peshawar",
    province: "KPK",
    location: "University Campus, Peshawar",
    website: "https://www.uetpeshawar.edu.pk",
    programs: ["BSCS", "BSEE", "BS Civil"],
    description:
      "Public engineering university with campuses in several cities of Khyber Pakhtunkhwa.",
  },
  // 79
  {
    name: "Khyber Medical University (KMU)",
    city: "Peshawar",
    province: "KPK",
    location: "Phase 5, Hayatabad, Peshawar",
    website: "https://www.kmu.edu.pk",
    programs: ["MBBS", "BSc Nursing"],
    description:
      "Public medical university affiliating many medical and dental colleges in the province.",
  },
  // 80
  {
    name: "CECOS University of IT and Emerging Sciences",
    city: "Peshawar",
    province: "KPK",
    location: "Phase 6, Hayatabad, Peshawar",
    website: "https://www.cecos.edu.pk",
    programs: ["BSCS", "BSIT", "BSEE"],
    description:
      "Private university offering IT, engineering and management programmes.",
  },
  // 81
  {
    name: "Institute of Management Sciences (IMSciences), Peshawar",
    city: "Peshawar",
    province: "KPK",
    location: "Hayatabad, Peshawar",
    website: "https://imsciences.edu.pk",
    programs: ["BBA", "BS Economics", "BSCS"],
    description:
      "Public sector management institute with programmes in business, economics and IT.",
  },
  // 82
  {
    name: "Abdul Wali Khan University Mardan (AWKUM)",
    city: "Mardan",
    province: "KPK",
    location: "Mardan, Khyber Pakhtunkhwa",
    website: "https://www.awkum.edu.pk",
    programs: ["BSCS", "BBA", "BS Education"],
    description:
      "Public university with multiple campuses serving central Khyber Pakhtunkhwa.",
  },
  // 83
  {
    name: "University of Malakand",
    city: "Chakdara",
    province: "KPK",
    location: "Chakdara, Lower Dir",
    website: "https://uom.edu.pk",
    programs: ["BSCS", "BBA", "BS Islamic Studies"],
    description:
      "Public university located in Lower Dir district offering arts and science programmes.",
  },
  // 84
  {
    name: "Hazara University, Mansehra",
    city: "Mansehra",
    province: "KPK",
    location: "Dhodial, Mansehra",
    website: "https://www.hu.edu.pk",
    programs: ["BSCS", "BBA", "BS Education"],
    description:
      "Public university serving the Hazara region with programmes in arts, sciences and education.",
  },
  // 85
  {
    name: "Gomal University",
    city: "Dera Ismail Khan",
    province: "KPK",
    location: "Dera Ismail Khan, KPK",
    website: "https://www.gu.edu.pk",
    programs: ["BSCS", "BBA", "BS Agriculture"],
    description:
      "Public university in southern Khyber Pakhtunkhwa offering a variety of programmes.",
  },
  // 86
  {
    name: "University of Swat",
    city: "Swat",
    province: "KPK",
    location: "Charbagh, Swat",
    website: "https://uswat.edu.pk",
    programs: ["BSCS", "BBA", "BS Education"],
    description:
      "Public university located in the Swat valley with programmes in sciences and social sciences.",
  },
  // 87
  {
    name: "University of Swabi",
    city: "Swabi",
    province: "KPK",
    location: "Anbar, Swabi",
    website: "https://uoswabi.edu.pk",
    programs: ["BSCS", "BBA", "BS Agriculture"],
    description:
      "Public university located near Swabi offering diverse undergraduate programmes.",
  },
  // 88
  {
    name: "University of Haripur",
    city: "Haripur",
    province: "KPK",
    location: "Haripur, KPK",
    website: "https://uoh.edu.pk",
    programs: ["BSCS", "BBA", "BS Environmental Sciences"],
    description:
      "Public university in Haripur offering programmes in sciences, management and humanities.",
  },
  // 89
  {
    name: "Kohat University of Science and Technology (KUST)",
    city: "Kohat",
    province: "KPK",
    location: "Kohat, KPK",
    website: "https://kust.edu.pk",
    programs: ["BSCS", "BBA", "BS Physics"],
    description:
      "Public university offering programmes in physical sciences, social sciences and management.",
  },
  // 90
  {
    name: "Ghulam Ishaq Khan Institute of Engineering Sciences and Technology (GIKI)",
    city: "Swabi (Topi)",
    province: "KPK",
    location: "Topi, Swabi District",
    website: "https://giki.edu.pk",
    programs: ["BSCS", "BSEE", "BS Mechanical"],
    description:
      "Prestigious private engineering institute known for rigorous programmes in engineering and computer science.",
  },

  // =============
  // BALOCHISTAN
  // =============

  // 91
  {
    name: "University of Balochistan",
    city: "Quetta",
    province: "Balochistan",
    location: "Sariab Road, Quetta",
    website: "https://www.uob.edu.pk",
    programs: ["BSCS", "BBA", "BS Economics"],
    description:
      "Public university in Quetta offering programmes in sciences, social sciences and humanities.",
  },
  // 92
  {
    name: "Balochistan University of Information Technology, Engineering and Management Sciences (BUITEMS)",
    city: "Quetta",
    province: "Balochistan",
    location: "Airport Road and Takatu Campuses, Quetta",
    website: "https://www.buitms.edu.pk",
    programs: ["BSCS", "BSEE", "BBA"],
    description:
      "Public university focusing on IT, engineering and management education.",
  },
  // 93
  {
    name: "Sardar Bahadur Khan Women’s University (SBKWU)",
    city: "Quetta",
    province: "Balochistan",
    location: "Jinnah Town, Quetta",
    website: "https://www.sbkwu.edu.pk",
    programs: ["BSCS", "BBA", "BS Education"],
    description:
      "Public women’s university in Quetta offering arts, sciences and education programmes.",
  },
  // 94
  {
    name: "Balochistan University of Engineering and Technology (BUET) Khuzdar",
    city: "Khuzdar",
    province: "Balochistan",
    location: "Khuzdar, Balochistan",
    website: "https://buetk.edu.pk",
    programs: ["BSCS", "BSEE", "BS Civil"],
    description:
      "Public engineering university with core programmes in engineering and technology.",
  },
  // 95
  {
    name: "Lasbela University of Agriculture, Water and Marine Sciences (LUAWMS)",
    city: "Uthal",
    province: "Balochistan",
    location: "Uthal, District Lasbela",
    website: "https://www.luawms.edu.pk",
    programs: ["BS Agriculture", "DVM"],
    description:
      "Public university specialising in agriculture, water and marine sciences.",
  },

  // ====================
  // AZAD JAMMU & KASHMIR
  // ====================

  // 96
  {
    name: "University of Azad Jammu and Kashmir (UAJK)",
    city: "Muzaffarabad",
    province: "Azad Jammu and Kashmir",
    location: "Muzaffarabad, AJK",
    website: "https://www.ajku.edu.pk",
    programs: ["BSCS", "BBA", "BS Education"],
    description:
      "Public university in Muzaffarabad offering programmes across sciences, arts and education.",
  },
  // 97
  {
    name: "Mirpur University of Science and Technology (MUST)",
    city: "Mirpur",
    province: "Azad Jammu and Kashmir",
    location: "Mirpur, AJK",
    website: "https://www.must.edu.pk",
    programs: ["BSCS", "BSEE", "BBA"],
    description:
      "Public sector university with programmes in engineering, technology and management.",
  },
  // 98
  {
    name: "University of Kotli Azad Jammu and Kashmir",
    city: "Kotli",
    province: "Azad Jammu and Kashmir",
    location: "Kotli, AJK",
    website: "https://uokajk.edu.pk",
    programs: ["BSCS", "BBA", "BS Education"],
    description:
      "Public university located in Kotli, offering undergraduate programmes in various disciplines.",
  },

  // =================
  // GILGIT-BALTISTAN
  // =================

  // 99
  {
    name: "Karakoram International University (KIU)",
    city: "Gilgit",
    province: "Gilgit-Baltistan",
    location: "Gilgit, Gilgit-Baltistan",
    website: "https://www.kiu.edu.pk",
    programs: ["BSCS", "BBA", "BS Mountain Studies"],
    description:
      "Public university in Gilgit with programmes focusing on mountain studies, sciences and social sciences.",
  },
  // 100
  {
    name: "University of Baltistan, Skardu",
    city: "Skardu",
    province: "Gilgit-Baltistan",
    location: "Skardu, Gilgit-Baltistan",
    website: "https://uobs.edu.pk",
    programs: ["BSCS", "BBA", "BS Tourism"],
    description:
      "Public university in Skardu offering programmes related to tourism, management and social sciences.",
  },
];

async function seed() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGO_URI);

    console.log("Clearing universities collection...");
    await University.deleteMany({});

    console.log(`Inserting ${universities.length} universities...`);
    await University.insertMany(universities);

    console.log("✅ Seed completed successfully.");
  } catch (err) {
    console.error("❌ Seed error:", err);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

seed();
