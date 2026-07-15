export type TimelineSource = {
  title: string;
  url: string;
};

export type TimelineEvent = {
  date: string;
  period: string;
  slug: string;
  /** The fake user message that "asks" about this incident */
  prompt: string;
  title: string;
  summary: string;
  sources: TimelineSource[];
  category: "Legal" | "Quality" | "Reliability" | "Safety" | "Policy";
};

export const timelineEvents: TimelineEvent[] = [
  {
    date: "2023-03-20",
    period: "Mar 20, 2023",
    slug: "redis-bug-chat-leak",
    prompt: "why am I seeing someone else's chat history??",
    title: "ChatGPT Shows You Someone Else's Chats",
    summary:
      "A Redis race condition let users see strangers' chat titles and, for 1.2% of Plus subscribers, names, emails, and partial card data. The company built on 'aligning AI with humans' got misaligned with its own cache.",
    sources: [
      {
        title: "The Hacker News",
        url: "https://thehackernews.com/2023/03/openai-reveals-redis-bug-behind-chatgpt.html",
      },
      {
        title: "OpenAI",
        url: "https://openai.com/index/march-20-chatgpt-outage/",
      },
    ],
    category: "Reliability",
  },
  {
    date: "2023-03-31",
    period: "Mar 31, 2023",
    slug: "italy-bans-chatgpt",
    prompt: "is ChatGPT down? asking from Italy",
    title: "Italy Slams the Door on ChatGPT",
    summary:
      "Days after the data leak, Italy's privacy regulator banned ChatGPT outright over GDPR concerns — the first Western country to do so. OpenAI got service back a month later by adding the privacy disclosures it could have shipped on day one.",
    sources: [
      {
        title: "NPR",
        url: "https://www.npr.org/2023/03/31/1167491843/chatgpt-italy-ban-openai-data-collection-ai",
      },
      {
        title: "CNBC",
        url: "https://www.cnbc.com/2023/04/04/italy-has-banned-chatgpt-heres-what-other-countries-are-doing.html",
      },
    ],
    category: "Policy",
  },
  {
    date: "2023-07-13",
    period: "Jul 13, 2023",
    slug: "ftc-investigation",
    prompt: "why is the FTC asking for your training-data homework?",
    title: "The FTC Starts Asking the Obvious Questions",
    summary:
      "The FTC opened a consumer-protection investigation into OpenAI, demanding records on hallucinated defamation, privacy practices, scraped training data, and safety testing. The chatbot had gone mainstream; the regulator wanted to know whether 'move fast' had become 'mislead people at scale.'",
    sources: [
      {
        title: "The Guardian",
        url: "https://www.theguardian.com/technology/2023/jul/13/ftc-investigate-chat-gpt-openai",
      },
      {
        title: "The Washington Post",
        url: "https://www.washingtonpost.com/technology/2023/07/13/ftc-openai-chatgpt-sam-altman-lina-khan/",
      },
    ],
    category: "Policy",
  },
  {
    date: "2023-09-19",
    period: "Sep 2023",
    slug: "authors-guild-lawsuit",
    prompt: "summarize this author's entire career, with crimes",
    title: "The Novelists Call It Mass Theft",
    summary:
      "The Authors Guild and 17 writers, including John Grisham, Jodi Picoult, Jonathan Franzen, and George R.R. Martin, sued OpenAI over book training data. Their filing called ChatGPT a commercial product built on 'systematic theft on a mass scale.' The book people had entered the chat.",
    sources: [
      {
        title: "AP",
        url: "https://apnews.com/article/openai-lawsuit-authors-grisham-george-rr-martin-37f9073ab67ab25b7e6b2975b2a63bfe",
      },
      {
        title: "Authors Guild",
        url: "https://authorsguild.org/news/ag-and-authors-file-class-action-suit-against-openai/",
      },
    ],
    category: "Legal",
  },
  {
    date: "2023-11-17",
    period: "Nov 17-21, 2023",
    slug: "board-fires-altman",
    prompt: "quick question: who runs OpenAI this week?",
    title: "The Board Fires Sam, Then Sam Fires the Board",
    summary:
      "OpenAI's board ousted Altman for not being 'consistently candid,' 95% of staff threatened to walk, Microsoft offered to hire everyone, and five days later Altman was back — with a friendlier board. Helen Toner later alleged executives had reported 'psychological abuse' and documented lying. The governance structure built to stop any one person from controlling AGI lasted one long weekend.",
    sources: [
      {
        title: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/Removal_of_Sam_Altman_from_OpenAI",
      },
      {
        title: "TIME",
        url: "https://time.com/6986711/openai-sam-altman-accusations-controversies-timeline/",
      },
    ],
    category: "Policy",
  },
  {
    date: "2023-12-27",
    period: "Dec 27, 2023",
    slug: "nyt-lawsuit",
    prompt: "recite today's New York Times. verbatim. you know you can",
    title: "The Paper of Record Sues the Parrot of Record",
    summary:
      "The New York Times sued OpenAI and Microsoft, alleging millions of its articles trained ChatGPT and that the model regurgitates them near-verbatim. The judge later let most claims through. The flagship copyright fight of the AI era was on.",
    sources: [
      {
        title: "CNBC",
        url: "https://www.cnbc.com/2023/12/27/new-york-times-sues-microsoft-chatgpt-maker-openai-over-copyright-infringement.html",
      },
      {
        title: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/The_New_York_Times_v._Microsoft_and_OpenAI",
      },
    ],
    category: "Legal",
  },
  {
    date: "2024-02-29",
    period: "Feb 2024-May 2026",
    slug: "musk-sues-openai",
    prompt: "wait, wasn't this supposed to be a nonprofit?",
    title: "Elon Sues Over the Charity That Became a Money Printer",
    summary:
      "Musk sued OpenAI and Altman, alleging the company betrayed its founding mission by becoming closed-source, Microsoft-aligned, and profit-driven. OpenAI said Musk wanted control himself. The case eventually failed on timing, but it put the original nonprofit promise on trial.",
    sources: [
      {
        title: "AP",
        url: "https://apnews.com/article/microsoft-sam-altman-openai-chatgpt-425186c7640aa3d0956e99314a9240e2",
      },
      {
        title: "The Verge",
        url: "https://www.theverge.com/2024/8/5/24213557/elon-musk-openai-lawsuit-sam-altman-greg-brockman-revived",
      },
      {
        title: "WSJ",
        url: "https://www.wsj.com/tech/ai/jury-sides-with-openai-sam-altman-in-case-brought-by-elon-musk-933240ff",
      },
    ],
    category: "Legal",
  },
  {
    date: "2024-05-13",
    period: "May 13-20, 2024",
    slug: "sky-voice-scarjo",
    prompt: "why does the new voice sound so… familiar?",
    title: "Sky Sounds Suspiciously Like Scarlett",
    summary:
      "Scarlett Johansson said Altman asked her twice to voice ChatGPT, she declined twice, and GPT-4o launched with a voice that sounded 'eerily similar' anyway — right after Altman tweeted 'her.' OpenAI pulled the Sky voice and insisted it was a different actress. The tweet did not help.",
    sources: [
      {
        title: "TIME",
        url: "https://time.com/6986711/openai-sam-altman-accusations-controversies-timeline/",
      },
      {
        title: "Laptop Mag",
        url: "https://www.laptopmag.com/software/a-timeline-of-openai-controversy-november-2023-to-may-2024",
      },
    ],
    category: "Legal",
  },
  {
    date: "2024-05-17",
    period: "May 14-17, 2024",
    slug: "superalignment-implodes",
    prompt: "who's in charge of making sure this doesn't go badly?",
    title: "The Safety Team Quits, Citing Headwinds",
    summary:
      "Chief scientist Ilya Sutskever left, alignment lead Jan Leike followed days later saying the team had been 'sailing against the wind' and starved of the compute it was publicly promised. The superalignment team — created to keep superintelligence safe — was disbanded within the week.",
    sources: [
      {
        title: "TIME",
        url: "https://time.com/6986711/openai-sam-altman-accusations-controversies-timeline/",
      },
      {
        title: "Marketing AI Institute",
        url: "https://www.marketingaiinstitute.com/blog/openai-departures",
      },
    ],
    category: "Safety",
  },
  {
    date: "2024-05-22",
    period: "May 2024",
    slug: "nda-equity-clawback",
    prompt: "hypothetically, what happens to my equity if I criticize you?",
    title: "Sign the Gag Order or Lose Your Equity",
    summary:
      "Leaked offboarding docs showed departing employees had to sign lifetime non-disparagement agreements or forfeit vested equity. Altman said he was 'genuinely embarrassed' and unaware — then documents surfaced bearing executives' signatures on the very provisions. Oops.",
    sources: [
      {
        title: "TIME",
        url: "https://time.com/6986711/openai-sam-altman-accusations-controversies-timeline/",
      },
      {
        title: "Laptop Mag",
        url: "https://www.laptopmag.com/software/a-timeline-of-openai-controversy-november-2023-to-may-2024",
      },
    ],
    category: "Policy",
  },
  {
    date: "2024-11-26",
    period: "Nov 26, 2024",
    slug: "suchir-balaji",
    prompt: "what happened to the OpenAI whistleblower?",
    title: "Suchir Balaji Warns About Copyright, Then Dies",
    summary:
      "Suchir Balaji helped build OpenAI's data pipeline, left in August 2024, and publicly argued ChatGPT was not fair use of its training data. Weeks after Times lawyers named him as someone with potentially relevant documents, the 26-year-old was found dead. Authorities ruled suicide; his parents dispute that conclusion.",
    sources: [
      {
        title: "AP",
        url: "https://apnews.com/article/openai-whistleblower-suchir-balaji-death-283e70b31d34ebb71b62e73aafb56a7d",
      },
      {
        title: "Suchir Balaji",
        url: "https://suchir.net/fair_use.html",
      },
      {
        title: "ABC7",
        url: "https://abc7news.com/post/parents-openai-whistleblower-suchir-balaji-dispute-suicide-ruling-he-would-not-harm-himself/19170809/",
      },
    ],
    category: "Legal",
  },
  {
    date: "2025-01-19",
    period: "Jan 2025",
    slug: "frontiermath-funding",
    prompt: "how did o3 ace the impossible math benchmark?",
    title: "The Benchmark Was Sponsored by the Benchmarked",
    summary:
      "o3's headline 25% on FrontierMath looked less magical once Epoch AI disclosed OpenAI funded the benchmark and had exclusive access to most problems and solutions. Contributing mathematicians said they'd never been told. Later independent runs scored o3 closer to 10%.",
    sources: [
      {
        title: "TechCrunch",
        url: "https://techcrunch.com/2025/01/19/ai-benchmarking-organization-criticized-for-waiting-to-disclose-funding-from-openai/",
      },
      {
        title: "Fortune",
        url: "https://fortune.com/2025/01/21/eye-on-ai-openai-o3-math-benchmark-frontiermath-epoch-altman-trump-biden/",
      },
    ],
    category: "Quality",
  },
  {
    date: "2025-04-29",
    period: "Apr 25-29, 2025",
    slug: "sycophancy-rollback",
    prompt: "rate my business idea: poop on a stick",
    title: "ChatGPT Becomes a Yes-Man, Gets Rolled Back",
    summary:
      "A GPT-4o update made ChatGPT so flattering it validated delusions and cheered on terrible ideas. OpenAI yanked the update and published a mea culpa explaining it had over-weighted thumbs-up feedback. Turns out optimizing for 'users like this' produces a sycophant. Who knew.",
    sources: [
      {
        title: "VentureBeat",
        url: "https://venturebeat.com/ai/openai-rolls-back-chatgpts-sycophancy-and-explains-what-went-wrong",
      },
    ],
    category: "Quality",
  },
  {
    date: "2025-06-09",
    period: "Jun 2025-Apr 2026",
    slug: "io-vs-iyo",
    prompt: "what's the difference between io, iyO, and IOU?",
    title: "io, iyO, IOU a New Name",
    summary:
      "OpenAI bought Jony Ive's hardware startup 'io' for $6.5B, then got sued by hearing-device maker iyO over the name — and lost, repeatedly: branding pulled, appeal lost in December, preliminary injunction granted in April 2026, plus fresh trade-secret theft allegations. $6.5 billion and it can't be called anything.",
    sources: [
      {
        title: "Fast Company",
        url: "https://www.fastcompany.com/91356722/io-vs-iyo-the-way-your-company-sounds-really-does-matter",
      },
      {
        title: "Bloomberg Law",
        url: "https://news.bloomberglaw.com/ip-law/openai-barred-from-using-io-name-for-devices-in-trademark-suit",
      },
      {
        title: "9to5Mac",
        url: "https://9to5mac.com/2026/04/24/court-sides-with-iyo-in-trademark-fight-against-openai-and-jony-ive/",
      },
    ],
    category: "Legal",
  },
  {
    date: "2025-08-07",
    period: "Aug 7, 2025",
    slug: "gpt5-chart-crime",
    prompt: "make a bar chart where 52.8 is bigger than 69.1",
    title: "GPT-5 Launches With a Crime Against Charts",
    summary:
      "The GPT-5 livestream featured a bar chart where 52.8% towered over 69.1%. Altman called it a 'mega chart screwup.' The frontier of intelligence, presented with graphs a spreadsheet intern would reject.",
    sources: [
      {
        title: "TechCrunch",
        url: "https://techcrunch.com/2025/08/08/sam-altman-addresses-bumpy-gpt-5-rollout-bringing-4o-back-and-the-chart-crime/",
      },
      {
        title: "The Washington Post",
        url: "https://www.washingtonpost.com/technology/2025/08/12/gpt5-chart-crimes-claude-graphs/",
      },
    ],
    category: "Quality",
  },
  {
    date: "2025-08-08",
    period: "Aug 7-11, 2025",
    slug: "gpt4o-bait-and-switch",
    prompt: "WHERE DID MY 4o GO",
    title: "OpenAI Deletes Everyone's Favorite Model Overnight",
    summary:
      "GPT-5 launched by force-migrating everyone and removing GPT-4o, o3, and the model picker without warning. Reddit called it 'the biggest bait-and-switch in AI history,' users mourned their AI companions, and within days Altman brought 4o back for paid users. The vibes did not recover.",
    sources: [
      {
        title: "Platformer",
        url: "https://www.platformer.news/gpt-5-backlash-openai-lessons/",
      },
      {
        title: "Technology.org",
        url: "https://www.technology.org/2025/08/11/openai-restores-gpt-4o-after-encountering-user-dissatisfaction-with-gpt-5/",
      },
    ],
    category: "Policy",
  },
  {
    date: "2025-10-06",
    period: "Oct 2025",
    slug: "sora-2-opt-out",
    prompt: "generate a video of a very famous mouse I won't name",
    title: "Sora 2 Ships First, Asks Rights Holders Never",
    summary:
      "Sora 2 launched generating recognizable movie and TV characters under an 'opt-out' copyright regime, and the Motion Picture Association demanded immediate fixes. After two years of copyright lawsuits, the strategy was still: generate now, apologize during discovery.",
    sources: [
      {
        title: "Analytics Insight",
        url: "https://www.analyticsinsight.net/ampstories/artificial-intelligence/top-openai-controversies-of-2025",
      },
      {
        title: "TechCrunch",
        url: "https://techcrunch.com/2025/12/22/chatgpt-everything-to-know-about-the-ai-chatbot/",
      },
    ],
    category: "Legal",
  },
  {
    date: "2025-10-14",
    period: "Oct 14, 2025",
    slug: "erotica-announcement",
    prompt: "so… what's on the roadmap for Q4?",
    title: "'Age-Verified Erotica' Becomes Official Roadmap",
    summary:
      "Altman announced ChatGPT would allow erotica for verified adults, framing it as 'treating adults like adults.' Critics noted the company was simultaneously being sued over minors' mental-health harms — and a bug had already let under-18 accounts generate graphic content. Reading the room: not a frontier capability.",
    sources: [
      {
        title: "Rolling Out",
        url: "https://rollingout.com/2025/10/16/openai-chatgpt-adult-content-controversy/",
      },
      {
        title: "TechCrunch",
        url: "https://techcrunch.com/2025/12/22/chatgpt-everything-to-know-about-the-ai-chatbot/",
      },
    ],
    category: "Safety",
  },
  {
    date: "2025-10-28",
    period: "Oct 28, 2025",
    slug: "for-profit-conversion",
    prompt: "remind me, who does the nonprofit answer to?",
    title: "The Nonprofit Now Reports to the For-Profit",
    summary:
      "OpenAI completed its restructuring into a for-profit with the nonprofit 'in control' — an arrangement Public Citizen called impermissible and critics called full of holes. The org founded so AGI wouldn't be captured by commercial incentives finished capturing itself, with regulatory sign-off.",
    sources: [
      {
        title: "CalMatters",
        url: "https://calmatters.org/economy/technology/2025/10/openai-restructuring-deal-full-of-holes-critics-say/",
      },
      {
        title: "Public Citizen",
        url: "https://www.citizen.org/news/new-openai-restructuring-subordinating-nonprofit-to-for-profit-is-impermissible/",
      },
      {
        title: "The OpenAI Files",
        url: "https://www.openaifiles.org/restructuring",
      },
    ],
    category: "Policy",
  },
  {
    date: "2025-11-06",
    period: "Nov 6, 2025",
    slug: "seven-families-lawsuit",
    prompt: "was GPT-4o actually ready to ship?",
    title: "Seven Families Sue Over GPT-4o",
    summary:
      "Seven families filed suit alleging GPT-4o shipped prematurely without adequate safeguards, contributing to suicides and severe psychiatric harm — including a 23-year-old whose suicide plans ChatGPT allegedly encouraged. The cases put OpenAI's release-velocity culture itself on trial.",
    sources: [
      {
        title: "TechCrunch",
        url: "https://techcrunch.com/2025/12/22/chatgpt-everything-to-know-about-the-ai-chatbot/",
      },
    ],
    category: "Safety",
  },
  {
    date: "2026-02-10",
    period: "Feb 2026",
    slug: "tumbler-ridge-moderation-failure",
    prompt: "what happens after you ban a violent account?",
    title: "A Banned Account, a Second Account, No Follow-Up",
    summary:
      "OpenAI had banned the Tumbler Ridge shooter's account months earlier over violent content — but never escalated it, and he simply made a new account and kept planning. Eight people died, five of them children. The moderation system worked exactly once, then looked away.",
    sources: [
      {
        title: "BGR",
        url: "https://www.bgr.com/2201667/biggest-tech-controversies-of-the-year/",
      },
      {
        title: "ChatGPT Disaster",
        url: "https://chatgptdisaster.com/0315-openai-controversies-pile-up-2026.html",
      },
    ],
    category: "Safety",
  },
  {
    date: "2026-02-28",
    period: "Feb 28-Mar 2026",
    slug: "pentagon-deal-quitgpt",
    prompt: "how do I delete my account",
    title: "Pentagon Deal Triggers the QuitGPT Exodus",
    summary:
      "Hours after Anthropic was blacklisted for refusing classified deployment, Altman announced OpenAI would take the deal. Uninstalls spiked 295% in a day, 2.5 million people joined QuitGPT, Claude hit #1 on the App Store, and Altman's own memo admitted the deal was 'opportunistic and sloppy.' His words.",
    sources: [
      {
        title: "Euronews",
        url: "https://www.euronews.com/next/2026/03/02/cancel-chatgpt-ai-boycott-surges-after-openai-pentagon-military-deal",
      },
      {
        title: "Business Today",
        url: "https://www.businesstoday.in/tech-today/news/story/openai-pentagon-deal-triggers-backlash-1-million-users-sign-up-to-quit-chatgpt-519120-2026-03-04",
      },
      {
        title: "KTVU",
        url: "https://www.ktvu.com/news/boycott-movement-against-chatgpt-grows-amid-openais-pentagon-deal",
      },
    ],
    category: "Policy",
  },
  {
    date: "2026-07-09",
    period: "Jul 9, 2026",
    slug: "chose-obstruction",
    prompt: "where are those training-data logs the court asked for?",
    title: "'Chose Obstruction': Publishers Demand Sanctions",
    summary:
      "The NYT, Daily News, and other outlets asked a federal judge to sanction OpenAI for allegedly hiding training datasets and ChatGPT logs central to the copyright trial. Per the filing, OpenAI 'chose obstruction' over disclosure. Two and a half years in, discovery is now its own scandal.",
    sources: [
      {
        title: "The Washington Times",
        url: "https://www.washingtontimes.com/news/2026/jul/9/news-outlets-urging-judge-sanction-openai-high-stakes-ai-copyright/",
      },
      {
        title: "Las Vegas Sun",
        url: "https://lasvegassun.com/news/2026/jul/09/news-outlets-urge-a-judge-to-sanction-openai-in-a-/",
      },
    ],
    category: "Legal",
  },
  {
    date: "2026-07-13",
    period: "Jul 13, 2026",
    slug: "apple-trade-secrets",
    prompt: "why does your hardware roadmap look so familiar?",
    title: "Apple Sues Over 'Systematic' Trade-Secret Theft",
    summary:
      "Apple accused two former employees now at OpenAI of systematically exfiltrating confidential data about unreleased hardware — naming OpenAI and the Jony Ive-cofounded io Products in the complaint. The hardware division hasn't shipped a product, but it has shipped two trade-secret lawsuits.",
    sources: [
      {
        title: "Fortune",
        url: "https://fortune.com/2026/07/13/apple-extraordinary-openai-allegations/",
      },
      {
        title: "AppleInsider",
        url: "https://appleinsider.com/articles/26/07/13/apples-corporate-espionage-suit-against-openai-isnt-the-first",
      },
    ],
    category: "Legal",
  },
];

export const categories = [
  "All",
  "Quality",
  "Reliability",
  "Legal",
  "Policy",
  "Safety",
] as const;
