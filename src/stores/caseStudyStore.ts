import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { Project, ProjectsList } from "../types/ProjectTypes";

export const useProjectsStore = defineStore("caseStudy", () => {
  let active = ref(false);

  let currentCaseStudy = ref<number>(0);
  let currentProject = computed((): Project | undefined => {
    return projectsList.find((pr) => pr.id === currentCaseStudy.value);
  });

  const projectsList: ProjectsList = [
    {
      client: "NEONAIL",
      title: "Accelera",
      country: "Poland",
      industry: "Beauty | E-commerce",
      duration: "6 months",
      categories: ["WFM", "RBAC", "Timesheets"],
      id: 1,
      banner: "/projects/rcp/banner/RCPCosmo-banner.webp",
      benefit:
        "Tired of manual processes in workforce management? Yeee, completely understandable, we also were. Accelera genuinely transforms that experience. We focused on freeing up our team's time by automating the timesheet management, ensuring approvals are quick and seamless, and providing transparency across all operations. Less frustration from repetitive tasks each month and more focus on what truly matters.",
      videoPath: "/rcp_edited_converted.mp4",
      caseStudy: true,
      challenges: {
        technical: [
          "Dynamic Role-Based UI Rendering",
          "Complex Scheduling & Time Card Interfaces",
          "Cross-Device Multi-column Responsive Tables",
        ],
        theoretical:
          "At NEONAIL, we've had enough of paper timecards – the printing, filling, scanning, and re-sending is a genuine time drain for our team. Our goal is to build an intuitive, user-friendly workforce management panel that truly stands out against the best paid solutions on the market.",
      },
      process: [
        {
          title: "Planning",
          keywords: [
            "Deconstructing UI/UX Designs",
            "Feature Breakdown",
            "Technical Feasibility Assessment",
          ],
        },
        {
          title: "Development",
          keywords: [
            "Design Recreation",
            "Components Development",
            "Styles & Animations",
            "API Integration",
          ],
        },
        {
          title: "Optimization",
          keywords: ["Testing", "Performance tuning"],
        },
        {
          title: "Deployment",
          keywords: ["Build Process", "Hosting"],
        },
      ],
      outcome: [
        {
          data: "~65%",
          description:
            "Less time spent on filling, approving and printing timecards",
        },
        {
          data: "~90k",
          description: "PLN saved on external software yearly",
        },
        {
          data: "45k+",
          description: "Timecards filed over Accelera yearly",
        },
      ],
      outcomeDesc:
        "We've successfully built the new digital heart for NEONAIL's workforce management. What we have now is a solid, in-house platform designed purely for our needs. It features a role-based interface that customizes what each person sees for their timecards and schedules. This UI handles complex entries and adapts perfectly to any device, even with multi-column tables. Behind the scenes, our system automates all timesheet processing and makes approvals happen fast and clear, cutting out nearly all the old manual work. It's a quick system, gives real-time data, and just makes operations clearer and easier for everyone. ",
      userFlow: [
        {
          title: "Manager creating timecard",
          img: "/flow/rcp/RCP-manager_creating_timecard.png",
        },
        {
          title: "Manager approving timecard",
          img: "/flow/rcp/RCP-manager_approving.png",
        },
        {
          title: "User filling in timecard",
          img: "/flow/rcp/RCP-user_filling_timecard.png",
        },
      ],
      stack: ["Vue 3", "Typescript", "Pinia", "Axios", "Vite"],
      team: "Front End Developer, Back End Developer, UI/UX Designer",
      description: `Accelera is a comprehensive workforce management solution that streamlines time tracking, scheduling, and time card management for organizations of any size. With a role-based system, it offers tailored functionalities for administrators, managers, and employees, ensuring efficient and accurate management of employee work records.`,
      active: false,
      year: "2023/2024",
    },
    {
      client: "NEONAIL",
      title: "BizBrief",
      country: "Poland",
      industry: "Beauty | E-commerce",
      duration: "3 months",
      categories: ["Announcements", "Updates", "News"],
      id: 2,
      banner: "/projects/news/banner/CosmoNews-banner.webp",
      benefit:
        "BizBrief App is an all-in-one internal news platform designed to keep everyone in your company informed and engaged. It offers a dynamic, organized system for sharing company updates, announcements, and internal content through customizable categories and posts.",
      videoPath: "/cosmo_news_converted.mp4",
      caseStudy: true,
      challenges: {
        technical: [
          "Complex text editor",
          "Complex search filters",
          "Cross-Device responsiveness",
        ],
        theoretical:
          "NEONAIL sends all information to its employees by email which causes a lot of spam. Some employees are not aware of the internal life of the company. What is needed is an application that will provide employees with easy access to all the most important information the company wants to communicate.",
      },
      process: [
        {
          title: "Planning",
          keywords: [
            "Deconstructing UI/UX Designs",
            "Feature Breakdown",
            "Technical Feasibility Assessment",
          ],
        },
        {
          title: "Development",
          keywords: [
            "Design Recreation",
            "Components Development",
            "Styles & Animations",
            "API Integration",
          ],
        },
        {
          title: "Optimization",
          keywords: ["Testing", "Performance tuning", "Images optimizing"],
        },
        {
          title: "Deployment",
          keywords: ["Build Process", "Hosting"],
        },
      ],
      outcome: [
        {
          data: "40%",
          description:
            "Less email inbox clutter. Say goodbye to the endless scroll of unnecessary messages.",
        },
        {
          data: "100%!",
          description: "Employees truly informed and engaged.",
        },
        {
          data: "100%!",
          description:
            "HR team missing the 'send all' button, but you certainly won't miss the email detox!",
        },
      ],
      outcomeDesc:
        "With the BizBrief App, NEONAIL's internal communication is managed well. No more missing out on what's actually happening. Our team now has one clean, easy-to-use spot for all important updates, announcements, and internal content. It's built to keep everyone genuinely in the loop, giving them quick access to the information they need, organized simply.  Everyone is finally able to know what's going on.",
      userFlow: [
        {
          title: "Manager creating post",
          img: "/flow/news/NEWS-manager_post.png",
        },
        {
          title: "User searching for post",
          img: "/flow/news/NEWS-user_search.png",
        },
        {
          title: "User hot news",
          img: "/flow/news/NEWS-user_hot_news.png",
        },
      ],
      stack: ["Vue 3", "Ts", "Axios", "Vite"],
      team: "Front End Developer, Back End Developer, UI/UX Designer",
      description: `BizBrief App is an all-in-one internal news platform designed to keep everyone in your company informed and engaged. It offers a dynamic, organized system for sharing company updates, announcements, and internal content through customizable categories and posts.`,
      active: false,
      year: "2024/2025",
    },
    {
      client: "NEONAIL",
      title: "NNCatalog",
      country: "Poland",
      industry: "Beauty | E-commerce",
      duration: "2 months and counting",
      categories: ["Library", "B2B", "Products"],
      id: 3,
      banner: "/projects/catalog/banner/nn-catalog-banner.webp",
      benefit:
        "NEONAIL Catalog is all in one products library for B2B clients mainly. It's simple and effective design doesn't distracts with a lot of choices and allows to keep focus on the main thing it provides, the extensive library of products that are available across different NEONAIL marketplaces.",
      videoPath: "/nn-catalog.mp4",
      caseStudy: true,
      challenges: {
        technical: [
          "Complex data table with filters, searching and pagination",
          "Performance for a lot of records",
          "Cross-Device responsiveness",
        ],
        theoretical:
          "NEONAIL is developing a product library specifically for our B2B contractors. This new platform will centralize all our product information, making life easier for contractors and possibly customers.",
      },
      process: [
        {
          title: "Planning",
          keywords: [
            "Deconstructing UI/UX Designs",
            "Feature Breakdown",
            "Technical Feasibility Assessment",
          ],
        },
        {
          title: "Development",
          keywords: [
            "Design Recreation",
            "Components Development",
            "Styles & Animations",
            "API Integration",
          ],
        },
        {
          title: "Optimization",
          keywords: ["Testing", "Performance tuning", "Images optimizing"],
        },
        {
          title: "Deployment",
          keywords: ["Build Process", "Hosting"],
        },
      ],
      outcome: [
        {
          data: "24/7",
          description: "Access to entire catalog",
        },
        {
          data: "3000+",
          description: "Products available",
        },
        {
          data: "3+",
          description: "Marketplaces",
        },
      ],
      outcomeDesc:
        "We developed product library that accomplish simplicity and efficiency. There is not much going on besides the core library features - that's exactly what we planned, zero user attention dilution. Table works smoothly with over 3000 products, caching, searching and pagination. Goals have been reached",
      userFlow: [
        {
          title: "User searching for product",
          img: "/flow/catalog/catalog-user.png",
        },
      ],
      hideOutcomeInfo: true,
      stack: ["Vue 3", "Typescript", "Pinia", "Axios", "Vite"],
      team: "Front End Developer, Back End Developer, UI/UX Designer",
      description: ``,
      active: false,
      year: "2025/In progress",
    },
    // {
    //   title: "Cosmo Orders",
    //   categories: ["Tracking", "Orders", "Returns"],
    //   id: 3,
    //   videoPath: "/returns_converted.mp4",
    //   stack: ["Vue 3", "TS", "Axios", "Vite"],
    //   team: [
    //     "1 Front End Developer",
    //     "1 Back End Developer",
    //     "1 UX/UI Designer",
    //   ],
    //   description: `Cosmo Returns is a user-friendly platform designed to streamline the process of managing returns and complaints for customers. With an intuitive interface, it allows users to easily create, track, and review return requests and complaints, ensuring a smooth resolution process.`,
    //   active: false,
    //   caseStudy: false,
    //   year: "2024",
    // },
  ];

  return { currentProject, projectsList, currentCaseStudy, active };
});
