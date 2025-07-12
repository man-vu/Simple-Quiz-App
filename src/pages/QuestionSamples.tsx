import { NoteCompletionNoHint } from "@/components/questions/NoteCompletionNoHint";
import { TrueFalseNotGiven } from "@/components/questions/TrueFalseNotGiven";
import { SingleAnswer } from "@/components/questions/SingleAnswer";
import { MatchingParagraph } from "@/components/questions/MatchingParagraph";
import { YesNoNotGiven } from "@/components/questions/YesNoNotGiven";
import { MatchingFeatureName } from "@/components/questions/MatchingFeatureName";
import { NoteCompletionWithHint } from "@/components/questions/NoteCompletionWithHint";
import { MultipleAnswer } from "@/components/questions/MultipleAnswer";
import { MatchingHeading } from "@/components/questions/MatchingHeading";
import { SentenceCompletion } from "@/components/questions/SentenceCompletion";
import { TableCompletion } from "@/components/questions/TableCompletion";
import { ShortAnswer } from "@/components/questions/ShortAnswer";
import { FillInTheBlank } from "@/components/questions/FillInTheBlank";

export default function QuestionSamples() {
  return (
    <div className="container mx-auto py-10 space-y-16">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Question Type Samples</h1>
        <p className="text-lg text-slate-600">Examples of different question types available in Quizverse</p>
      </div>

      {/* True False Not Given */}
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold border-b pb-2">True / False / Not Given</h2>
        <TrueFalseNotGiven
          id="tfng-sample"
          instruction="Do the following statements agree with the information given in the reading passage?"
          passageText="The Internet of Things (IoT) describes physical objects with sensors, processing ability, software, and other technologies that connect and exchange data with other devices and systems over the Internet or other communications networks. The field has evolved due to the convergence of multiple technologies, including ubiquitous computing, commodity sensors, increasingly powerful embedded systems, and machine learning. Traditional fields of embedded systems, wireless sensor networks, control systems, automation, and others all contribute to enabling the Internet of things. In the consumer market, IoT technology is most synonymous with products pertaining to the concept of the 'smart home', including devices and appliances."
          statements={[
            {
              id: "tfng-1",
              text: "The Internet of Things requires physical objects to have sensors.",
              correctAnswer: "TRUE"
            },
            {
              id: "tfng-2",
              text: "IoT evolved primarily because of advancements in artificial intelligence.",
              correctAnswer: "FALSE"
            },
            {
              id: "tfng-3",
              text: "Smart home devices are the most common application of IoT in business settings.",
              correctAnswer: "NOT GIVEN"
            }
          ]}
        />
      </div>

      {/* Single Answer */}
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold border-b pb-2">Multiple Choice (Single Answer)</h2>
        <SingleAnswer
          id="sa-sample"
          instruction="Choose the correct option."
          question="What is the primary function of photosynthesis in plants?"
          options={[
            { id: "sa-1", text: "To produce oxygen for animal respiration" },
            { id: "sa-2", text: "To convert sunlight into chemical energy" },
            { id: "sa-3", text: "To absorb carbon dioxide from the atmosphere" },
            { id: "sa-4", text: "To release water vapor into the air" }
          ]}
          correctAnswerId="sa-2"
        />
      </div>

      {/* Multiple Answer */}
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold border-b pb-2">Multiple Choice (Multiple Answer)</h2>
        <MultipleAnswer
          id="ma-sample"
          instruction="Select all correct options."
          question="Which of the following are noble gases?"
          options={[
            { id: "ma-1", text: "Helium" },
            { id: "ma-2", text: "Oxygen" },
            { id: "ma-3", text: "Neon" },
            { id: "ma-4", text: "Argon" },
            { id: "ma-5", text: "Nitrogen" }
          ]}
          correctAnswers={["ma-1", "ma-3", "ma-4"]}
        />
      </div>

      {/* Note Completion No Hint */}
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold border-b pb-2">Note Completion (No Hint)</h2>
        <NoteCompletionNoHint
          id="ncnh-sample"
          instruction="Complete the notes below. Write NO MORE THAN TWO WORDS for each answer."
          content={`<h3>Deep-Sea Exploration</h3>
<p>The deepest part of the ocean is the <strong>[BLANK_1]</strong> Trench, which reaches a depth of approximately 11,000 meters.</p>
<p>Scientists use special vessels called <strong>[BLANK_2]</strong> to study these extreme environments.</p>
<p>The pressure at the ocean's deepest point is more than <strong>[BLANK_3]</strong> times the pressure at sea level.</p>`}
          blanks={[
            { id: "1", correctAnswer: "Mariana" },
            { id: "2", correctAnswer: "submersibles" },
            { id: "3", correctAnswer: "thousand" }
          ]}
        />
      </div>

      {/* Note Completion With Hint */}
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold border-b pb-2">Note Completion (With Hint)</h2>
        <NoteCompletionWithHint
          id="ncwh-sample"
          instruction="Complete the notes below using the words provided in the box."
          content={`<h3>Renewable Energy</h3>
<p>Solar power works by converting [BLANK_sunlight] into electricity using photovoltaic panels.</p>
<p>Wind turbines generate power by using the [BLANK_kinetic] energy of moving air to turn blades.</p>
<p>Hydroelectric dams produce electricity by controlling the [BLANK_flow] of water through turbines.</p>`}
          blanks={[
            { id: "sunlight", correctAnswer: "sunlight" },
            { id: "kinetic", correctAnswer: "kinetic" },
            { id: "flow", correctAnswer: "flow" }
          ]}
          options={["chemical", "flow", "kinetic", "pressure", "solar", "sunlight", "thermal"]}
        />
      </div>

      {/* Fill in the Blank */}
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold border-b pb-2">Fill in the Blank</h2>
        <FillInTheBlank
          id="fib-sample"
          instruction="Fill in the blanks with appropriate words."
          content={`<p>The process of [BLANK_1] is essential for human survival, as it allows oxygen to enter the bloodstream and carbon dioxide to be expelled from the body.</p>
<p>The [BLANK_2] is the organ responsible for pumping blood throughout the body's circulatory system.</p>
<p>The human brain contains approximately [BLANK_3] billion neurons, which communicate through electrical and chemical signals.</p>`}
          blanks={[
            { id: "1", correctAnswer: "respiration" },
            { id: "2", correctAnswer: "heart" },
            { id: "3", correctAnswer: "86" }
          ]}
          wordBank={["respiration", "heart", "liver", "86", "100", "digestion"]}
        />
      </div>

      {/* Matching Paragraph */}
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold border-b pb-2">Matching Paragraph</h2>
        <MatchingParagraph
          id="mp-sample"
          instruction="Match the statements with the correct paragraphs."
          paragraphs={[
            {
              id: "para-1",
              number: 1,
              text: "Honeybees communicate with each other about food sources through a complex 'dance' behavior. When a forager bee finds a rich source of nectar, it returns to the hive and performs specific movements that indicate both the direction and distance to the food source."
            },
            {
              id: "para-2",
              number: 2,
              text: "Ants create elaborate underground networks of tunnels and chambers. These structures include specialized areas for different purposes: nurseries for larvae, food storage chambers, and even 'waste management' zones located far from the main colony."
            },
            {
              id: "para-3",
              number: 3,
              text: "Termites build massive mounds that can reach several meters in height. These structures are engineering marvels, designed with sophisticated ventilation systems that maintain consistent internal temperature and humidity levels, despite external weather conditions."
            }
          ]}
          statements={[
            {
              id: "stmt-1",
              text: "This species constructs homes with natural air conditioning systems.",
              correctParagraphId: "para-3"
            },
            {
              id: "stmt-2",
              text: "These insects use movement to provide specific information about resource locations.",
              correctParagraphId: "para-1"
            },
            {
              id: "stmt-3",
              text: "These creatures designate specific areas for different colony functions.",
              correctParagraphId: "para-2"
            }
          ]}
        />
      </div>

      {/* Matching Heading */}
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold border-b pb-2">Matching Headings</h2>
        <MatchingHeading
          id="mh-sample"
          instruction="Match each paragraph with the most suitable heading."
          headings={[
            { id: "head-1", text: "Historical Development of Computing" },
            { id: "head-2", text: "Artificial Intelligence in Modern Society" },
            { id: "head-3", text: "Ethical Considerations in Technology" },
            { id: "head-4", text: "Future Trends in Digital Communication" }
          ]}
          paragraphs={[
            {
              id: "para-h-1",
              number: 1,
              text: "From massive room-sized machines to powerful pocket-sized devices, computing technology has evolved dramatically over the past century. The first electronic computer, ENIAC, weighed 30 tons and could perform basic calculations. Today's smartphones are millions of times more powerful, demonstrating the exponential pace of technological advancement.",
              correctHeadingId: "head-1"
            },
            {
              id: "para-h-2",
              number: 2,
              text: "As algorithms increasingly make decisions that impact human lives, questions arise about fairness, accountability, and transparency. Privacy concerns grow as data collection becomes ubiquitous, while automation raises questions about employment disruption and economic inequality. These challenges require thoughtful policy approaches and corporate responsibility.",
              correctHeadingId: "head-3"
            },
            {
              id: "para-h-3",
              number: 3,
              text: "Machine learning systems now diagnose diseases, drive cars, recommend content, and even create art. These systems are becoming integrated into everyday services and infrastructure, often in ways invisible to users. While offering tremendous benefits in efficiency and capability, this integration also raises important questions about human agency and oversight.",
              correctHeadingId: "head-2"
            }
          ]}
        />
      </div>

      {/* Matching Feature/Name */}
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold border-b pb-2">Matching Feature/Name</h2>
        <MatchingFeatureName
          id="mfn-sample"
          instruction="Match each description with the correct architectural feature."
          features={[
            { id: "feat-1", name: "Flying Buttress" },
            { id: "feat-2", name: "Dome" },
            { id: "feat-3", name: "Column" },
            { id: "feat-4", name: "Arch" }
          ]}
          questions={[
            {
              id: "q-1",
              text: "A curved structure that spans an opening, distributing weight evenly to supports on either side.",
              correctFeatureId: "feat-4"
            },
            {
              id: "q-2",
              text: "An external support that transfers thrust from a roof or vault to a structure outside the building.",
              correctFeatureId: "feat-1"
            },
            {
              id: "q-3",
              text: "A vertical support element that typically consists of a base, shaft, and capital.",
              correctFeatureId: "feat-3"
            }
          ]}
        />
      </div>

      {/* Yes/No/Not Given */}
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold border-b pb-2">Yes/No/Not Given</h2>
        <YesNoNotGiven
          id="yng-sample"
          instruction="Do the following statements reflect the author's opinion in the text?"
          passageText="While electric vehicles represent a significant step toward reducing carbon emissions, we must acknowledge they are not a perfect solution to our environmental challenges. The electricity that powers these vehicles often comes from fossil fuel plants, simply moving the emissions from the tailpipe to the power station. Additionally, the production of batteries requires mining rare earth minerals, which has its own environmental impact. Nevertheless, as renewable energy sources increasingly power our electrical grid and battery technology improves, electric vehicles will continue to become greener options. We should therefore support their adoption while simultaneously pushing for improvements in the entire energy ecosystem."
          statements={[
            {
              id: "yng-1",
              text: "The author believes electric vehicles currently solve all environmental problems associated with transportation.",
              correctAnswer: "NO"
            },
            {
              id: "yng-2",
              text: "The author supports increasing the use of electric vehicles despite their limitations.",
              correctAnswer: "YES"
            },
            {
              id: "yng-3",
              text: "The author thinks governments should provide tax incentives for electric vehicle purchases.",
              correctAnswer: "NOT_GIVEN"
            }
          ]}
        />
      </div>

      {/* Sentence Completion */}
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold border-b pb-2">Sentence Completion</h2>
        <SentenceCompletion
          id="sc-sample"
          instruction="Complete each sentence with the correct ending from the options given."
          sentences={[
            {
              id: "sent-1",
              prefix: "The Great Barrier Reef is threatened by rising ocean temperatures, which cause coral bleaching and",
              blank: {
                id: "b-1",
                options: [
                  "increase biodiversity in the region.",
                  "lead to ecosystem collapse.",
                  "improve tourism opportunities."
                ],
                correctAnswer: "lead to ecosystem collapse."
              },
              suffix: "",
              number: 1
            },
            {
              id: "sent-2",
              prefix: "Sustainable agriculture practices aim to",
              blank: {
                id: "b-2",
                options: [
                  "maximize short-term yields regardless of environmental impact.",
                  "reduce production costs while increasing chemical usage.",
                  "maintain soil health and minimize environmental damage."
                ],
                correctAnswer: "maintain soil health and minimize environmental damage."
              },
              suffix: "",
              number: 2
            }
          ]}
        />
      </div>

      {/* Table Completion */}
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold border-b pb-2">Table Completion</h2>
        <TableCompletion
          id="tc-sample"
          instruction="Complete the table using the words from the box."
          headers={["Planet", "Distance from Sun", "Notable Feature"]}
          rows={[
            {
              id: "row-1",
              cells: [
                { id: "r1c1", isBlank: false, content: "Mercury" },
                { id: "r1c2", isBlank: false, content: "57.9 million km" },
                { id: "r1c3", isBlank: true, content: "", hasDropdown: true, options: ["smallest", "hottest", "coldest"] }
              ]
            },
            {
              id: "row-2",
              cells: [
                { id: "r2c1", isBlank: false, content: "Venus" },
                { id: "r2c2", isBlank: true, content: "", hasDropdown: true, options: ["108.2 million km", "149.6 million km", "227.9 million km"] },
                { id: "r2c3", isBlank: false, content: "hottest" }
              ]
            },
            {
              id: "row-3",
              cells: [
                { id: "r3c1", isBlank: false, content: "Earth" },
                { id: "r3c2", isBlank: false, content: "149.6 million km" },
                { id: "r3c3", isBlank: true, content: "", hasDropdown: true, options: ["most diverse", "largest", "has rings"] }
              ]
            }
          ]}
          wordBank={["smallest", "hottest", "most diverse", "108.2 million km", "227.9 million km"]}
        />
      </div>

      {/* Short Answer */}
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold border-b pb-2">Short Answer</h2>
        <ShortAnswer
          id="sh-sample"
          instruction="Answer the question in 50-70 words."
          question="What are some potential benefits and challenges of implementing renewable energy sources on a global scale?"
          minWords={50}
          maxWords={70}
          marks={5}
          sampleAnswer="Renewable energy implementation offers significant benefits including reduced carbon emissions, energy independence, and job creation. However, challenges include high initial costs, intermittent supply issues, storage limitations, and geographical constraints. Additionally, transitioning existing infrastructure requires substantial investment and policy support. Despite these challenges, technological advancements continue to make renewables increasingly viable alternatives to fossil fuels."
        />
      </div>
    </div>
  );
}