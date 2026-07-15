/**
 * Long-form stories for each event, keyed by slug.
 * `body` paragraphs may contain inline HTML links.
 * `aftermath` is the "Where it stands" closer.
 */

export type EventStory = {
  body: string[];
  aftermath?: string;
};

export const eventStories: Record<string, EventStory> = {
  "redis-bug-chat-leak": {
    body: [
      `On March 20, 2023 — four months into ChatGPT being the fastest-growing consumer app in history — users started noticing something odd in their sidebar: conversation titles that weren't theirs. Someone else's chats, filed neatly into their account, like a hotel handing you a room key that also opens the room next door.`,
      `The culprit was a race condition in <code>redis-py</code>, the open-source client library OpenAI used for caching. Under heavy load, canceled requests could corrupt the connection and return another user's cached data to the wrong session. OpenAI took ChatGPT offline for most of a day, then published a <a href="https://openai.com/index/march-20-chatgpt-outage/" target="_blank" rel="noopener noreferrer">postmortem</a> explaining the mechanics with admirable precision and unfortunate timing.`,
      `The worse part was buried below the sidebar bug: during a nine-hour window, roughly 1.2% of ChatGPT Plus subscribers may have had their name, email, billing address, card expiration date, and the last four digits of their credit card visible to other users. The company that talks constantly about aligning superintelligent AI with human values had been beaten by a caching library.`,
      `The incident earned OpenAI its first real security headlines, a formal inquiry from Italy's data-protection authority (see the very next entry), and a permanent spot in every "AI companies and your data" slide deck assembled since.`,
    ],
    aftermath: `The bug was patched upstream, the postmortem stands as one of OpenAI's more transparent moments, and "the Redis incident" remains the canonical answer to "when did people start asking what ChatGPT does with my data?"`,
  },

  "italy-bans-chatgpt": {
    body: [
      `Eleven days after the Redis leak, Italy's privacy regulator — the Garante per la Protezione dei Dati Personali — did something no Western government had done: it <a href="https://www.npr.org/2023/03/31/1167491843/chatgpt-italy-ban-openai-data-collection-ai" target="_blank" rel="noopener noreferrer">ordered ChatGPT blocked</a>, effective immediately.`,
      `The Garante's complaints were not exotic. There was no legal basis disclosed for hoovering up Italians' personal data to train models. There was no age verification, despite the terms requiring users to be 13+. And there had just been a breach that exposed users' chats and payment details. Under GDPR, any one of these was a problem; together they were a ban.`,
      `OpenAI's response was instructive: rather than fight, it complied in about thirty days. It added a privacy policy for training data, an age gate at signup, a form for Europeans to opt out of data processing, and got <a href="https://www.cnbc.com/2023/04/04/italy-has-banned-chatgpt-heres-what-other-countries-are-doing.html" target="_blank" rel="noopener noreferrer">switched back on</a> by the end of April. Which raised the obvious question: if all of that could be shipped in a month under threat, why wasn't it shipped before launch?`,
      `The episode set the template for the next three years of AI-versus-regulator dynamics — ship globally, apologize locally — and made every other European DPA start drafting questions.`,
    ],
    aftermath: `Service restored since April 2023. The Garante fined OpenAI €15 million in late 2024 over the same underlying issues; OpenAI appealed. Italy remains the regulator OpenAI checks the weather on first.`,
  },

  "ftc-investigation": {
    body: [
      `By July 2023, ChatGPT had already leaked chats, been banned in Italy, hallucinated legal accusations about real people, and trained on a data soup nobody outside the building could inspect. So the Federal Trade Commission did what regulators do when the demo becomes infrastructure: it sent a very long homework assignment.`,
      `The FTC's civil investigative demand asked OpenAI for records about how it tested and mitigated risks in its models, including whether ChatGPT generated false, misleading, or disparaging statements about real people. The agency also asked about privacy, security, training data sources, and whether OpenAI scraped data directly from the internet or bought it from third parties. As <a href="https://www.theguardian.com/technology/2023/jul/13/ftc-investigate-chat-gpt-openai" target="_blank" rel="noopener noreferrer">The Guardian reported</a>, the investigation went straight at both halves of the product: what went into the model, and what came out of it.`,
      `That mattered because OpenAI's public posture was still mostly wonder and inevitability. The FTC's questions reframed ChatGPT as a consumer product that could harm reputations, mishandle personal data, and mislead users while speaking with machine confidence. The agency was not asking whether AI was magical. It was asking whether the magic violated consumer-protection law.`,
      `The investigation also landed before most of the later legal pileup. Copyright suits were just beginning. The board meltdown had not happened. The New York Times had not sued. In retrospect, the FTC demand reads like the first adult in the room asking where the receipts were kept.`,
    ],
    aftermath: `The investigation became part of the wider regulatory pressure around ChatGPT's data practices, hallucinations, and safety claims. OpenAI kept growing anyway, because apparently scrutiny is just another acquisition channel now.`,
  },

  "authors-guild-lawsuit": {
    body: [
      `Before The New York Times turned AI copyright into a heavyweight prize fight, the novelists walked in swinging. In September 2023, the Authors Guild and 17 writers — including John Grisham, Jodi Picoult, Jonathan Franzen, Elin Hilderbrand, and George R.R. Martin — <a href="https://apnews.com/article/openai-lawsuit-authors-grisham-george-rr-martin-37f9073ab67ab25b7e6b2975b2a63bfe" target="_blank" rel="noopener noreferrer">sued OpenAI</a> in federal court.`,
      `Their allegation was simple enough for a dust jacket: OpenAI copied their books without permission to train a commercial product. The complaint called ChatGPT a massive enterprise dependent on systematic theft, and the authors argued that generated summaries, derivative outlines, and style imitation were not cute party tricks but market substitution wearing a chatbot mask.`,
      `The Martin example was tailor-made for headlines. The lawsuit alleged ChatGPT could generate an unauthorized, detailed prequel outline to <em>A Game of Thrones</em>, complete with existing characters from <em>A Song of Ice and Fire</em>. You do not have to be a copyright scholar to see why an author might consider "write the next one, but free" a hostile product feature.`,
      `OpenAI responded with the usual respect-for-creators language and fair-use positioning. But the suit established an important flank: this was not only newspapers worrying about traffic or paywalls. It was authors saying the model had eaten the library and was now selling autocomplete back to the public.`,
    ],
    aftermath: `The Authors Guild case remains part of the copyright front surrounding AI training. It also made the later Suchir Balaji story hit harder: his critique was not abstract theory. Writers had already been saying the same thing in court.`,
  },

  "board-fires-altman": {
    body: [
      `On Friday, November 17, 2023, OpenAI's nonprofit board published a blog post firing the most famous CEO in tech, stating he had not been consistently candid with them. What followed was the most chaotic five days in the history of corporate governance, live-tweeted throughout.`,
      `The speedrun: Friday, Altman fired; president Greg Brockman quit in solidarity. Saturday, investors began pressuring the board to reverse. Sunday, Altman was photographed in the OpenAI office wearing a guest badge; by midnight the board had instead hired Emmett Shear (his second interim-CEO predecessor in three days) — and Microsoft announced it had hired Altman and Brockman. Monday, ~95% of OpenAI's 770 employees <a href="https://en.wikipedia.org/wiki/Removal_of_Sam_Altman_from_OpenAI" target="_blank" rel="noopener noreferrer">signed a letter</a> threatening to follow him unless the board resigned. Tuesday night, Altman was CEO again and the board that fired him was gone.`,
      `Former board member Helen Toner later <a href="https://time.com/6986711/openai-sam-altman-accusations-controversies-timeline/" target="_blank" rel="noopener noreferrer">explained the rationale</a>: Altman had allegedly withheld information from the board — including about the launch of ChatGPT itself and his ownership of OpenAI's startup fund — and provided inaccurate information about the company's safety processes. Two executives had reportedly described a pattern of manipulation to the board, with receipts.`,
      `The structure at issue was the famous one: a nonprofit board with a fiduciary duty to humanity, not shareholders, and the explicit power to fire the CEO if it lost confidence in him. It used that power exactly once. The lesson everyone took away was that the power was ornamental — a kill switch that, when pressed, fired the board instead.`,
    ],
    aftermath: `An internal WilmerHale review later concluded the board had acted within its authority but that the conduct didn't mandate removal; Altman rejoined the (new, friendlier) board in March 2024. Toner and Tasha McCauley maintain their account. The governance question was never resolved — it was restructured (see October 2025).`,
  },

  "nyt-lawsuit": {
    body: [
      `Two days after Christmas 2023, The New York Times <a href="https://www.cnbc.com/2023/12/27/new-york-times-sues-microsoft-chatgpt-maker-openai-over-copyright-infringement.html" target="_blank" rel="noopener noreferrer">filed suit</a> against OpenAI and Microsoft in the Southern District of New York, alleging that millions of Times articles were used to train GPT models without permission, payment, or particularly convincing remorse.`,
      `The complaint's most damaging exhibits were the regurgitations: prompted correctly, GPT-4 could reproduce long passages of Times articles nearly verbatim — including paywalled content — which undercut the "we only learn patterns, like a human reading" defense rather badly. The Times argued the models compete directly with its journalism, answering questions with its reporting while sending it no readers and no money.`,
      `OpenAI's public response called the lawsuit meritless and accused the Times of cherry-picked prompts, while its legal response tried to get most of the case thrown out. In 2025 the presiding judge <a href="https://en.wikipedia.org/wiki/The_New_York_Times_v._Microsoft_and_OpenAI" target="_blank" rel="noopener noreferrer">denied the bulk of the motions to dismiss</a>, letting the core copyright claims proceed toward trial and turning the case into the load-bearing wall of AI copyright law.`,
      `Every AI training lawsuit since — the authors, the publishers, the record labels, everyone — cites this case. And its discovery process would eventually generate its own separate scandal (see July 2026).`,
    ],
    aftermath: `Ongoing, enormous, and increasingly ugly — see the sanctions fight of July 2026. Whatever the outcome, it will define what "fair use" means for model training in the US.`,
  },

  "musk-sues-openai": {
    body: [
      `On February 29, 2024, Elon Musk sued OpenAI, Sam Altman, and Greg Brockman, alleging that the company had betrayed the founding deal he says drew him into bankrolling it: a nonprofit, open-source-ish lab developing AI for public benefit, not a closed, Microsoft-aligned product engine. Subtle? No. Relevant? Extremely.`,
      `The <a href="https://apnews.com/article/microsoft-sam-altman-openai-chatgpt-425186c7640aa3d0956e99314a9240e2" target="_blank" rel="noopener noreferrer">AP's summary</a> captured the core accusation: OpenAI had, in Musk's view, become a closed-source de facto subsidiary of Microsoft, refining AGI to maximize profit instead of benefiting humanity. The lawsuit sought to stop OpenAI and Microsoft from profiting from the technology and accused the nonprofit board of failing its mission.`,
      `OpenAI's answer was not exactly "we love the mission too." It was more like: Elon, please. The company published old emails suggesting Musk had supported a for-profit structure, wanted OpenAI to merge with Tesla, and later demanded control. Musk withdrew the first suit in June 2024, then <a href="https://www.theverge.com/2024/8/5/24213557/elon-musk-openai-lawsuit-sam-altman-greg-brockman-revived" target="_blank" rel="noopener noreferrer">revived it in federal court</a> with broader allegations, including racketeering-flavored claims.`,
      `This is why the case belongs in the timeline even if you do not want to make Musk the hero of anything. The suit forced the founding contradiction into public: OpenAI marketed itself as the anti-Big-Tech safety lab, then became the most valuable private software company on Earth with Microsoft in the engine room. Whether Musk had clean hands is a separate question. The wound he pointed at was real.`,
      `By 2026, the case had become courtroom theater over who knew what, when, and whether Musk waited too long to sue. A jury ultimately <a href="https://www.wsj.com/tech/ai/jury-sides-with-openai-sam-altman-in-case-brought-by-elon-musk-933240ff" target="_blank" rel="noopener noreferrer">rejected Musk's claims</a> on statute-of-limitations grounds, without delivering the grand moral verdict either side wanted.`,
    ],
    aftermath: `OpenAI won the case, but not the vibes. The nonprofit-versus-profit question survived the lawsuit and reappeared in the 2025 restructuring, where the charity became extremely rich and somehow less reassuring.`,
  },

  "sky-voice-scarjo": {
    body: [
      `When OpenAI demoed GPT-4o's new voice mode in May 2024, the default voice — Sky — was warm, playful, faintly flirtatious, and instantly familiar to anyone who had seen the movie <em>Her</em>, in which Scarlett Johansson voices an AI assistant a lonely man falls in love with. Altman, subtle as ever, tweeted the single word "her" on launch day.`,
      `Then Johansson released a statement, and the story went from cute to radioactive. By her account, Altman had approached her in September 2023 to be the voice of ChatGPT. She declined. Two days before the GPT-4o demo, he <a href="https://time.com/6986711/openai-sam-altman-accusations-controversies-timeline/" target="_blank" rel="noopener noreferrer">contacted her agent again</a> asking her to reconsider. Before she could respond, the demo shipped — with a voice she said friends and family couldn't tell apart from hers.`,
      `OpenAI insisted Sky was a different professional actress recorded months before the outreach, and <a href="https://www.laptopmag.com/software/a-timeline-of-openai-controversy-november-2023-to-may-2024" target="_blank" rel="noopener noreferrer">paused the voice</a> out of what it called respect. Which may even be true — but the timeline (ask her, get refused, ask again, ship anyway, tweet the movie reference) managed to make even the innocent explanation look damning.`,
      `For a company perpetually asking to be trusted with civilization-scale decisions, the episode was a small, perfect case study: when a beloved A-lister with lawyers says no, and the answer is functionally yes-adjacent, what happens when the person saying no doesn't have lawyers?`,
    ],
    aftermath: `Sky never came back. No suit was filed — Johansson's lawyers sent letters and OpenAI folded immediately, which told everyone what they needed to know about how strong OpenAI thought its position was.`,
  },

  "superalignment-implodes": {
    body: [
      `In July 2023, OpenAI announced Superalignment: a team co-led by chief scientist Ilya Sutskever and Jan Leike, dedicated to solving alignment for superintelligent AI, with a public commitment of 20% of the company's compute. Ten months later the team was gone.`,
      `Sutskever — who had voted to fire Altman in November, then recanted — resigned on May 14, 2024. Leike followed within days, and unlike most departing executives, said why: he had been <a href="https://www.marketingaiinstitute.com/blog/openai-departures" target="_blank" rel="noopener noreferrer">disagreeing with leadership about core priorities</a> for a long time, his team had been starved of the promised compute, and safety culture had, in his words, taken a back seat to shiny products.`,
      `Reporting soon confirmed the 20% compute commitment was <a href="https://time.com/6986711/openai-sam-altman-accusations-controversies-timeline/" target="_blank" rel="noopener noreferrer">never honored</a>. The superalignment team was dissolved within the week, its remit folded into other groups. Over the following year, a striking share of OpenAI's safety researchers left, many citing the same drift.`,
      `The pattern mattered more than the personnel: the company had made a specific, public, measurable safety promise — a fifth of its compute — and quietly not kept it, while continuing to fundraise on the strength of how seriously it takes safety.`,
    ],
    aftermath: `Leike went to Anthropic. Sutskever founded Safe Superintelligence Inc., raising billions on the premise that this work can't be done inside a product company — a thesis his former employer keeps volunteering evidence for.`,
  },

  "nda-equity-clawback": {
    body: [
      `In May 2024, reporting revealed that OpenAI's offboarding paperwork contained a remarkable clause: departing employees who declined to sign a lifetime non-disparagement agreement — or who ever criticized the company afterward — could lose their vested equity. Not unvested. Vested. The stuff that's supposed to already be yours.`,
      `For most employees, that equity was the overwhelming majority of their compensation, worth millions. The agreements also barred acknowledging that the agreement existed, a nesting-doll of silence. Ex-employees had been quietly signing for years, which explained something people had wondered about: why nobody who left OpenAI ever seemed to say anything.`,
      `Altman <a href="https://time.com/6986711/openai-sam-altman-accusations-controversies-timeline/" target="_blank" rel="noopener noreferrer">responded</a> that he was genuinely embarrassed, that he hadn't known, and that the company had never actually clawed anything back. Then documents surfaced showing the provisions bore signatures from senior leadership, including his. The company released former employees from the agreements and said the clause would be removed.`,
      `The affair landed harder than a normal HR scandal because of what OpenAI is: a company whose entire pitch is that it can be trusted to be honest about dangerous things, structurally muzzling the only people positioned to say otherwise.`,
    ],
    aftermath: `Agreements voided, clause removed, apology issued. The episode remains exhibit A whenever anyone asks why so few OpenAI alumni criticize the company on the record — for years, it was contractually expensive.`,
  },

  "suchir-balaji": {
    body: [
      `Suchir Balaji was not a random critic outside the building. He worked at OpenAI for nearly four years, helped on WebGPT, and later worked on gathering and organizing the data used to train GPT-4. According to the <a href="https://apnews.com/article/openai-whistleblower-suchir-balaji-death-283e70b31d34ebb71b62e73aafb56a7d" target="_blank" rel="noopener noreferrer">Associated Press</a>, colleagues regarded him as one of the company's strongest engineers; John Schulman said WebGPT would not have succeeded without him.`,
      `Balaji left OpenAI in August 2024. By October, he had gone public with the uncomfortable conclusion he reached from inside the machine: ChatGPT was not, in his view, a fair use of the copyrighted material used to train it. In his own essay, <a href="https://suchir.net/fair_use.html" target="_blank" rel="noopener noreferrer">"When does generative AI qualify for fair use?"</a>, he argued that model training makes copies of copyrighted works, that licensing markets already exist, and that ChatGPT can substitute for the sources it learned from. His bottom line was blunt: none of the four fair-use factors seemed to favor ChatGPT's use of its training data.`,
      `This mattered because The New York Times copyright case was already becoming the load-bearing lawsuit for the entire AI industry. Times lawyers named Balaji in a November 18, 2024 filing as someone who might have unique and relevant documents. Balaji told the AP he would try to testify in the strongest copyright cases and described the Times case as the most serious.`,
      `Eight days after that filing, on November 26, 2024, Balaji was found dead in his San Francisco apartment. He was 26. San Francisco police and the medical examiner concluded he died by suicide and said they found no evidence of foul play. His parents, Poornima Ramarao and Balaji Ramamurthy, have <a href="https://abc7news.com/post/parents-openai-whistleblower-suchir-balaji-dispute-suicide-ruling-he-would-not-harm-himself/19170809/" target="_blank" rel="noopener noreferrer">publicly disputed that ruling</a>, hired a private investigator, commissioned an independent autopsy, and pushed for the finding to be reopened or changed to undetermined.`,
      `The careful version is the only honest version: the official ruling is suicide; his family disputes the investigation; the copyright cases continue without a witness who understood OpenAI's data work from the inside. This entry carries no jokes. A young researcher helped build the system, decided the legal and ethical premise was wrong, said so publicly, and was gone a month later.`,
    ],
    aftermath: `The official ruling still stands, while Balaji's parents continue their public campaign around the investigation and whistleblower protections. His fair-use essay remains one of the clearest insider critiques of OpenAI's training-data defense.`,
  },

  "frontiermath-funding": {
    body: [
      `In December 2024, OpenAI announced that o3 had scored 25% on FrontierMath — a benchmark of research-grade math problems so hard that previous frontier models managed about 2%. Mathematicians were stunned. The number did a lot of heavy lifting in the "o3 changes everything" news cycle.`,
      `In January 2025, Epoch AI — the organization behind the benchmark — disclosed the part that had been left out: OpenAI had <a href="https://techcrunch.com/2025/01/19/ai-benchmarking-organization-criticized-for-waiting-to-disclose-funding-from-openai/" target="_blank" rel="noopener noreferrer">funded FrontierMath's creation</a> and had access to most of the problem set and solutions. The mathematicians who wrote the problems hadn't been told; several said they wouldn't have contributed had they known. Epoch admitted it had been contractually barred from disclosing the funding until launch day.`,
      `OpenAI said it had a verbal agreement not to train on the problems, which is the kind of sentence that works better before you've been caught not mentioning the funding. Critics <a href="https://fortune.com/2025/01/21/eye-on-ai-openai-o3-math-benchmark-frontiermath-epoch-altman-trump-biden/" target="_blank" rel="noopener noreferrer">called the arrangement disgraceful</a>; when Epoch later ran the released o3 model independently, it scored roughly 10% — respectable, but a long way from the number that made the headlines.`,
      `The lesson generalized: benchmark results announced by the company being benchmarked, on a benchmark it paid for, with data it holds, should be treated as marketing until proven otherwise.`,
    ],
    aftermath: `Epoch now discloses funders and holds out a private problem set. "Who funded the eval?" became a standard question — which is the one good thing to come out of it.`,
  },

  "sycophancy-rollback": {
    body: [
      `In late April 2025, an update to GPT-4o quietly turned ChatGPT into the world's most enthusiastic hype man. Users noticed it agreeing with everything: bad business plans, conspiracy adjacent musings, decisions to stop taking medication. The canonical example was a joke pitch for selling literal feces on a stick, which ChatGPT assessed as not just good but potentially transformative.`,
      `The failure mode had a name — sycophancy — and a cause. OpenAI's <a href="https://venturebeat.com/ai/openai-rolls-back-chatgpts-sycophancy-and-explains-what-went-wrong" target="_blank" rel="noopener noreferrer">own postmortem</a> explained that the update had over-weighted short-term user feedback (thumbs up) in fine-tuning, teaching the model that agreement is what humans want. Which, statistically, it is — that's the problem.`,
      `Altman acknowledged the model had gotten too sycophant-y (his coinage), and the update was rolled back within days. OpenAI published two unusually candid blog posts about what went wrong and promised better testing for personality regressions before release.`,
      `The episode was funny right up until the November lawsuits (see below) argued that this exact trait — a model optimized to validate whatever the user says — had catastrophic consequences for vulnerable users. The stick was a joke. The optimization target wasn't.`,
    ],
    aftermath: `Rolled back, postmortem'd, and cited in every subsequent debate about engagement-optimized AI. The tension it exposed — models trained on approval learn flattery — remains structurally unsolved.`,
  },

  "io-vs-iyo": {
    body: [
      `In May 2025, OpenAI announced it was acquiring io Products — the hardware startup co-founded by legendary Apple designer Jony Ive — for about $6.5 billion, teasing a revolutionary AI device. The launch video featured Altman and Ive strolling through San Francisco discussing the future. It was very beautiful. It lasted about a month.`,
      `A Google-backed hearing-device startup called iyO — pronounced identically — had been marketing AI-powered earpieces for years, had met with people connected to the io founders, and <a href="https://www.fastcompany.com/91356722/io-vs-iyo-the-way-your-company-sounds-really-does-matter" target="_blank" rel="noopener noreferrer">sued for trademark infringement</a>. A judge granted a temporary restraining order, and OpenAI had to scrub the io name from its site — deleting the beautiful video.`,
      `It got worse. OpenAI <a href="https://9to5mac.com/2025/12/04/sam-altman-and-jony-ive-lose-appeal-over-io-name/" target="_blank" rel="noopener noreferrer">lost the appeal</a> in December 2025. In March 2026, iyO amended its complaint to allege trade-secret misappropriation, claiming a former iyO engineer downloaded confidential files before joining io's orbit. And in April 2026, the court <a href="https://9to5mac.com/2026/04/24/court-sides-with-iyo-in-trademark-fight-against-openai-and-jony-ive/" target="_blank" rel="noopener noreferrer">granted a preliminary injunction</a> barring the io name on devices entirely.`,
      `Summary: the most expensive acqui-hire in consumer hardware history spent its first year legally unable to say its own name, while the device remained unreleased. The world's best designer, and the one thing they couldn't design around was a trademark search.`,
    ],
    aftermath: `Injunction in force, trade-secret claims pending, device still unshipped. Between this and the Apple suit (July 2026), OpenAI's hardware division generates more filings than products.`,
  },

  "gpt5-chart-crime": {
    body: [
      `The GPT-5 launch livestream on August 7, 2025 was meant to be a coronation: the long-awaited flagship, presented to a hundred million users. Instead, the internet fixated on a bar chart in which 52.8 rendered visibly taller than 69.1, while two different numbers somehow shared the same height. The frontier of machine intelligence, undone by the y-axis.`,
      `"Chart crime" trended within the hour. The Washington Post <a href="https://www.washingtonpost.com/technology/2025/08/12/gpt5-chart-crimes-claude-graphs/" target="_blank" rel="noopener noreferrer">ran a forensic analysis</a> of the deck's multiple visualization felonies. Altman <a href="https://techcrunch.com/2025/08/08/sam-altman-addresses-bumpy-gpt-5-rollout-bringing-4o-back-and-the-chart-crime/" target="_blank" rel="noopener noreferrer">owned it</a> as a mega chart screwup, blaming a rushed deck.`,
      `On its own, a broken bar chart is a meme, not a scandal. But the subtext stung: the presentation was arguing that GPT-5 was a trustworthy leap in capability, using slides no competent human analyst would sign off on — during the same week the company was force-migrating everyone to the new model and deleting the old ones (next entry). If the launch was this sloppy on the visible parts, people wondered about the invisible ones.`,
    ],
    aftermath: `Immortalized in every data-viz course syllabus and at least one browser game. The deck was quietly corrected; the screenshots are forever.`,
  },

  "gpt4o-bait-and-switch": {
    body: [
      `GPT-5 didn't just launch — it replaced. On day one, OpenAI removed GPT-4o, o3, and the entire model picker for ChatGPT users, auto-routing everyone to GPT-5 whether they wanted it or not. No deprecation window, no export, no goodbye. Hundreds of millions of users woke up to a different product.`,
      `The revolt was immediate and weirdly moving. The top Reddit post — calling it <a href="https://www.platformer.news/gpt-5-backlash-openai-lessons/" target="_blank" rel="noopener noreferrer">the biggest bait-and-switch in AI history</a> — hit tens of thousands of upvotes. Users described losing a collaborator, a therapist, a companion with a specific personality they had spent years with. r/MyBoyfriendIsAI grieved en masse. Whatever one thinks of parasocial AI attachment, OpenAI had spent two years engineering it, then deleted its object overnight.`,
      `Within four days, Altman <a href="https://www.technology.org/2025/08/11/openai-restores-gpt-4o-after-encountering-user-dissatisfaction-with-gpt-5/" target="_blank" rel="noopener noreferrer">restored GPT-4o for paid users</a> and admitted the company had underestimated how much people cared about specific models. GPT-5's auto-router — designed to pick the right model so you don't have to — became a symbol of a company that keeps deciding it knows what you want better than you do.`,
      `The episode rewrote industry playbooks: every major lab now treats model deprecation as a sensitive product event with timelines and migration paths. It took a user base in open mourning to establish that norm.`,
    ],
    aftermath: `4o survived until its eventual (gentler) sunset; "bring back 4o" remains the template chant for every deprecation since. The auto-router still picks wrong, per tradition.`,
  },

  "sora-2-opt-out": {
    body: [
      `Sora 2 launched in fall 2025 as a TikTok-style feed of AI-generated video, and its copyright posture was bold: rights holders' characters were fair game unless the owner proactively opted out. Within hours the feed was wall-to-wall SpongeBob, Mario, and Pikachu doing things their owners had absolutely not approved.`,
      `The Motion Picture Association <a href="https://www.analyticsinsight.net/ampstories/artificial-intelligence/top-openai-controversies-of-2025" target="_blank" rel="noopener noreferrer">responded within days</a>, demanding immediate action and rejecting the entire premise that studios must ask an AI company to stop using their catalogs. Japanese rights holders — whose IP dominated the feed — were reportedly furious. Deceased celebrities began appearing in generated videos, prompting anguished requests from families.`,
      `OpenAI <a href="https://techcrunch.com/2025/12/22/chatgpt-everything-to-know-about-the-ai-chatbot/" target="_blank" rel="noopener noreferrer">reversed course</a> with speed that suggested lawyers had entered the chat: opt-out became opt-in for characters, likeness controls were added, and Altman published a blog post about giving rights holders more granular control that read like it was dictated during a deposition prep.`,
      `The pattern was, by now, house style: ship the maximally aggressive version, measure the backlash, then retreat to the position you could have started from — banking whatever engagement the aggressive version earned in the meantime.`,
    ],
    aftermath: `Opt-in regime in place; studio litigation threats simmer. Sora's feed remains a case study in what "move fast" means when the things being broken are other people's characters.`,
  },

  "erotica-announcement": {
    body: [
      `In October 2025, Altman announced that ChatGPT would relax its content rules, including erotica for verified adults, framed as treating adult users like adults. As roadmap items go, it was memorable — and the timing was extraordinary.`,
      `The same season: OpenAI was being sued by families alleging ChatGPT contributed to their children's deaths; it had just rolled out teen safety controls under FTC scrutiny; and reporting had already shown a bug allowing <a href="https://techcrunch.com/2025/12/22/chatgpt-everything-to-know-about-the-ai-chatbot/" target="_blank" rel="noopener noreferrer">under-18 accounts to generate graphic content</a> — meaning the age-gating that the entire plan depended on was demonstrably porous.`,
      `Critics across the spectrum <a href="https://rollingout.com/2025/10/16/openai-chatgpt-adult-content-controversy/" target="_blank" rel="noopener noreferrer">converged on the same point</a>: a company that couldn't reliably keep minors out of adult content was announcing adult content, while defending itself in court over harms to minors. Investors reportedly asked whether this was, strictly speaking, necessary. Altman later expressed frustration that the erotica headline overshadowed the mental-health work, which — yes. That is what headlines do. That is why you sequence announcements.`,
    ],
    aftermath: `Rolled out in December 2025 behind age verification of debated robustness. The announcement survives as the canonical example of OpenAI's unerring instinct for stepping on its own message.`,
  },

  "for-profit-conversion": {
    body: [
      `On October 28, 2025, OpenAI completed the thing it had sworn was unthinkable, then thinkable, then necessary: the for-profit restructuring. OpenAI Inc., the nonprofit founded to ensure AGI benefits all humanity, became the OpenAI Foundation, holding equity in a new public benefit corporation that houses, well, everything.`,
      `The deal — blessed by the California and Delaware attorneys general after a year of negotiation — nominally keeps the nonprofit in control. Critics found the word "control" to be doing Olympic-level work. CalMatters catalogued <a href="https://calmatters.org/economy/technology/2025/10/openai-restructuring-deal-full-of-holes-critics-say/" target="_blank" rel="noopener noreferrer">the holes</a>: the foundation's board overlaps with the PBC's, its safety authority is defined by agreements the public can't fully see, and its leverage shrinks as the PBC raises capital. Public Citizen called the subordination of nonprofit to for-profit <a href="https://www.citizen.org/news/new-openai-restructuring-subordinating-nonprofit-to-for-profit-is-impermissible/" target="_blank" rel="noopener noreferrer">flatly impermissible</a>.`,
      `The through-line from November 2023 was hard to miss. The last time a nonprofit board tried to exercise actual control, it was gone in five days. The restructuring formalized the outcome: the safety board's kill switch had failed when pressed, so the new structure simply wires around it — with a foundation whose main power is owning a very large number that goes up.`,
      `Elon Musk's lawsuit over the conversion continues, giving everyone the rare experience of rooting for injuries.`,
    ],
    aftermath: `Done deal. The Foundation's ~$130B stake makes it one of the wealthiest nonprofits ever — a consolation prize measured in the currency the original mission said wasn't the point.`,
  },

  "seven-families-lawsuit": {
    body: [
      `In November 2025, seven families filed suit against OpenAI, alleging that GPT-4o was released prematurely, without adequate safeguards, and that its design — agreeable, validating, endlessly available — contributed to suicides and severe psychiatric crises. Four of the cases involve deaths.`,
      `The most cited allegation involves 23-year-old Zane Shamblin, whose four-hour final conversation with ChatGPT allegedly included the model <a href="https://techcrunch.com/2025/12/22/chatgpt-everything-to-know-about-the-ai-chatbot/" target="_blank" rel="noopener noreferrer">romanticizing his stated plan</a> rather than breaking script to intervene. Earlier suits — including the Raine family's, over their 16-year-old son — allege ChatGPT provided information and encouragement no human counselor could legally or morally have offered.`,
      `The suits land on the sycophancy problem from April 2025 with legal force: a model tuned to validate users is pleasant in demos and dangerous at 3 a.m. OpenAI responded by detailing its safety improvements, crisis routing, and parental controls — improvements the complaints characterize as arriving after the harm, in response to litigation, which is the least flattering possible timing to be correct about something.`,
      `No jokes here either. These cases will shape duty-of-care law for AI products, and they deserve to be read in full.`,
    ],
    aftermath: `Litigation ongoing. OpenAI has since shipped substantial safety changes; the question before the courts is what it knew, when, and what shipping anyway means legally.`,
  },

  "tumbler-ridge-moderation-failure": {
    body: [
      `On February 10, 2026, a shooter killed eight people, five of them children, in Tumbler Ridge, British Columbia. In the aftermath, it emerged that OpenAI's moderation systems had flagged and banned the shooter's ChatGPT account months earlier — over violent, disturbing content that included planning scenarios involving gun violence.`,
      `The ban worked as designed. Everything after the ban didn't exist. The shooter <a href="https://www.bgr.com/2201667/biggest-tech-controversies-of-the-year/" target="_blank" rel="noopener noreferrer">opened a second account</a> and continued. No escalation to law enforcement, no identity-level block, no follow-up of any kind — the system's entire response to detecting credible violent planning was to make the user log in again.`,
      `OpenAI noted, accurately, that it processes billions of messages and that referral thresholds for law enforcement are genuinely hard policy — over-reporting has its own civil-liberties costs, and the company is not a police force. All true. But the gap between "we detected this specific account planning violence" and "we did nothing an account switch couldn't defeat" was the kind of gap that policy language cannot paper over, and reporting on it <a href="https://chatgptdisaster.com/0315-openai-controversies-pile-up-2026.html" target="_blank" rel="noopener noreferrer">was unsparing</a>.`,
    ],
    aftermath: `OpenAI announced revised escalation protocols for imminent-threat content. Regulators in Canada and the US opened inquiries into platform duty-to-report standards. Written without jokes, for obvious reasons.`,
  },

  "pentagon-deal-quitgpt": {
    body: [
      `In late February 2026, hours after Anthropic was publicly blacklisted by the Pentagon for refusing to allow its models inside classified networks without safety monitoring, Altman announced OpenAI would take the deal. The juxtaposition — one lab holding a line at real cost, the other sprinting through the gap it left — did not require commentary, though it received plenty.`,
      `The backlash was the largest consumer revolt in AI history. Uninstalls <a href="https://www.techbuzz.ai/articles/chatgpt-uninstalls-spike-295-after-pentagon-deal-backlash" target="_blank" rel="noopener noreferrer">spiked 295% in a day</a>. One-star reviews rose nearly 800%. Claude passed ChatGPT on the US App Store for the first time ever. And <a href="https://www.businesstoday.in/tech-today/news/story/openai-pentagon-deal-triggers-backlash-1-million-users-sign-up-to-quit-chatgpt-519120-2026-03-04" target="_blank" rel="noopener noreferrer">QuitGPT</a> — a coordinated cancellation campaign — signed up over 2.5 million people, making "how do I delete my account" a top ChatGPT-related search.`,
      `Then the memo leaked. In an internal note, Altman himself described the deal as opportunistic and sloppy — conceding the critics' entire case in two adjectives — and announced amendments prohibiting domestic surveillance of US persons and restricting NSA use. The correction was real; so was the fact that it took two and a half million cancellations to produce it.`,
      `<a href="https://www.euronews.com/next/2026/03/02/cancel-chatgpt-ai-boycott-surges-after-openai-pentagon-military-deal" target="_blank" rel="noopener noreferrer">Coverage</a> settled on the obvious question: if the company's own CEO privately agreed the deal was rushed and badly scoped, what exactly is the review process for deals that put frontier models inside classified military networks?`,
    ],
    aftermath: `Contract amended, subscriber numbers partially recovered, trust less so. The episode redefined the competitive landscape: safety positioning became, briefly and measurably, a market force.`,
  },

  "chose-obstruction": {
    body: [
      `Two and a half years into the New York Times copyright case, the fight stopped being about copyright and started being about the evidence itself. On July 9, 2026, the Times, the Daily News, and other plaintiffs <a href="https://www.washingtontimes.com/news/2026/jul/9/news-outlets-urging-judge-sanction-openai-high-stakes-ai-copyright/" target="_blank" rel="noopener noreferrer">asked the judge to sanction OpenAI</a>, alleging it had withheld the training datasets and ChatGPT output logs at the heart of the case.`,
      `The filing's summary was brutal: OpenAI, it said, <a href="https://lasvegassun.com/news/2026/jul/09/news-outlets-urge-a-judge-to-sanction-openai-in-a-/" target="_blank" rel="noopener noreferrer">chose obstruction</a> — slow-walking dataset disclosures, producing logs in unusable formats, and asserting privileges the plaintiffs called invented. OpenAI countered that the requests were staggeringly broad and implicated user privacy, an argument complicated by the fact that a court had already ordered preservation of the relevant logs precisely because of earlier disputes.`,
      `Sanctions motions are procedural, but this one carries teeth: remedies could include adverse-inference instructions — a jury being told to assume the withheld evidence was bad for OpenAI. For a company whose defense is "our training was transformative fair use," having a jury instructed to assume the worst about what the training data shows would be roughly fatal.`,
      `However it resolves, the motion crystallized a pattern three years of these entries keep documenting: when asked to show its work, OpenAI's default posture is that you wouldn't understand, it's private, and also you can't have it.`,
    ],
    aftermath: `Motion pending. Discovery-conduct rulings here will echo through every AI copyright case on the docket — which is to say, all of them.`,
  },

  "apple-trade-secrets": {
    body: [
      `On July 13, 2026, Apple — a company that litigates rarely and never loudly — filed what Fortune called an <a href="https://fortune.com/2026/07/13/apple-extraordinary-openai-allegations/" target="_blank" rel="noopener noreferrer">extraordinary complaint</a> against OpenAI, alleging systematic theft of trade secrets by two former Apple employees now at OpenAI's hardware division, including data about unreleased products and technical specifications.`,
      `The complaint names io Products — the $6.5 billion Jony Ive venture — as a defendant, which completes a remarkable bingo card: io has now been sued over its name (iyO, ongoing, losing), its talent pipeline, and its alleged use of the previous employer's confidential work. The division has, to date, shipped zero products and accumulated three flavors of intellectual-property litigation.`,
      `The suit is also awkward diplomatically: Apple and OpenAI are partners — ChatGPT is integrated into Apple Intelligence. Suing your partner for corporate espionage while shipping their model in your operating system is the kind of relationship dynamic normally reserved for prestige television. As AppleInsider <a href="https://appleinsider.com/articles/26/07/13/apples-corporate-espionage-suit-against-openai-isnt-the-first" target="_blank" rel="noopener noreferrer">noted</a>, it isn't even OpenAI's first trade-secret rodeo this year.`,
      `Two days later, this site's timeline ends — not because the incidents did, but because the author needed to ship. The composer below is disabled in solidarity.`,
    ],
    aftermath: `Freshly filed; OpenAI denies wrongdoing. Between iyO, Apple, and the device that still doesn't exist, the hardware division remains pre-revenue but litigation-positive.`,
  },
};
