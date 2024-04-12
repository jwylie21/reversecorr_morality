// DEFINE GLOBAL VARIABLES
let timeline = [];

//CHANGE

// jsPsych Initialization
const jsPsych = initJsPsych({
  use_webaudio: false,
  display_element: 'jspsych-target',
  show_progress_bar: false,
  default_iti: 0,
  on_finish: function (data) {
    jsPsych.data.displayData('csv');
  }
});

const participantId = jsPsych.data.getURLVariable('PROLIFIC_PID');
const studyId = jsPsych.data.getURLVariable('STUDY_ID');
const sessionId = jsPsych.data.getURLVariable('SESSION_ID');

const filename = `${participantId}` + "_" + `${studyId}` + "_" + `${sessionId}.csv`;

// Randomize assignment of condition:
let evilcondition = jsPsych.randomization.sampleWithoutReplacement(['evil', 'saintly'], 1)[0];


jsPsych.data.addProperties({
  participantId: participantId,
  studyId: studyId,
  sessionId: sessionId,
  evilcondition: evilcondition
});

// Options
const valueOpinionOptions = ['Yes', 'Somewhat', 'No'];

// Political Ideology
const politicalResponses = [
  "1 (Extremely liberal)",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7 (Extremely conservative)",
];

// Experimenter Demand Effects
const demandEffectsResponses = [
  "1 = Not at all",
  "2",
  "3",
  "4",
  "5 = Very much so"
];

// ENTER FULLSCREEN //
const enterFullscreen = {
  type: jsPsychFullscreen,
  name: 'enter_fullscreen',
  fullscreen_mode: true,
  delay_after: 0
};

timeline.push(enterFullscreen)

// CONSENT FORM //
const consentForm = {
  type: jsPsychSurveyMultiChoice,
  questions: [
    {
      name: 'consent',
      prompt: `
            <p style="text-align:left;">
              You are being asked to participate in a research study titled 
              "Moral Judgment and Decision-Making." You were selected to participate in 
              this project because you are an adult over age 18. This study is sponsored by 
              Boston College and the John Templeton Foundation.
            </p>
            <p style="text-align: left;">
              The purpose of this study is to understand how we weigh information about 
              others. This study will be conducted through this online survey. The survey 
              should take you between ___ minutes to complete. There are no direct 
              benefits to you, but you may feel gratified knowing that you helped further 
              the scholarly work in this research area, and we will compensate you for your 
              participation at a rate of ___. There are no costs to you associated with your 
              participation.
            </p>
            <p style="text-align: left;">
              The researchers do not believe participation would entail any risks or 
              discomforts beyond those ordinarily encountered in everyday life.
            </p>
            <p style="text-align: left;">
              This Principal Investigator, Dr. Liane Young, will exert all reasonable efforts 
              to keep your responses and your identity confidential. We will not maintain 
              within our research data any information that uniquely identifies you, such as 
              your name, location, or Internet Protocol (IP) address. In any report we 
              publish, we will not include any information that will make it possible to 
              identify a participant. Data that includes user-ID information will be collected 
              and stored via third-party servers like Qualtrics or Pavlovia. Data collected 
              from the experiment will be coded to remove your name or any other 
              personal identifiers. All records will be secured in a locked cabinet in our lab. 
              The Institutional Review Board at Boston College and internal Boston College 
              auditors may review the research records. State or federal laws or court 
              orders may also require that information from research study records be 
              released. Otherwise, the researchers will not release to others any 
              information that could indicate your identity unless you give your permission, 
              or unless the researchers become legally required to do so.
            </p>
            <p style="text-align: left;">
              Although the survey will not prompt you directly to identify yourself by 
              name, email address or the like, the survey will include several demographic 
              items that would prompt you to provide certain demographic information, 
              such as your age, gender, ethnicity, education level and the like. In 
              combination, responses to such questions could suggest your identity. 
              Regardless, please know that the researchers will make no purposeful effort 
              to discern your identity based on such information. Additionally, please note 
              that you may opt to leave any such questions blank.
            </p>
            <p style="text-align: left;">
              Your participation is voluntary. If you choose not to participate it will not 
              affect your relations with Boston College. Some questions on the survey, 
              such as comprehension questions, may be required in order to complete the 
              survey and receive compensation. However, you may still choose to end 
              your participation in the study at any time. If you have questions or concerns 
              concerning this research you may contact the Principal Investigator at 
              <a href="tel:16175520240">+1 (617) 552-0240</a>
              or <a href="mailto:liane.young@bc.edu">liane.young@bc.edu</a>. If you have 
              questions about your rights as a research participant, you may contact the
              Office for Research Protections, Boston College, at 
              <a href="tel:16175524778">+1 (617) 552-4778</a> or
              <a href="mailto:irb@bc.edu">irb@bc.edu</a>.
            </p>
            <p style="text-align: left;">
              If you agree to the statements above and agree to participate in this study,
              please select the “Consent given” button below to continue.
            </p>`,
      options: ["Consent not given", "Consent given"],
      horizontal: true,
      required: true
    }
  ],
  preamble: '<h2 style="text-align: center"><strong>Consent Form</strong></h2>',

  // If the participant does not consent, end the experiment
  on_finish: function (data) {
    if (jsPsych.data.get().last(1).values()[0].response.consent == "Consent not given") {
      jsPsych.endExperiment(
        `<p class="jspsych-center">
          You did not consent to participate in this study.<br>
          Please return this study in Prolific.
        </p>`
      );
    }
  }
};

timeline.push(consentForm);


// EVIL INSTRUCTIONS //
const instructionsEvil = {
  type: jsPsychInstructions,
  pages: [`
        <h2><strong>Instructions</strong></h2>
        <p style="text-align: left;">
          Welcome to this experiment! On the following pages, you will see a 
          series of computer-generated faces. 
        </p>
        <p style="text-align: left;">
          Your task is to select which of the two faces appears more <strong>morally bad</strong> to you.  
        </p>
        <p style="text-align: left;">
          <strong>
          To select, press the 'f' key for the left face, and the 'j' key for the right face. We are interested in your personal opinions.
          </strong>
        </p>`,
  ],
  show_clickable_nav: true,
};

// SAINTLY INSTRUCTIONS //
const instructionsSaintly = {
  type: jsPsychInstructions,
  pages: [
    `<h2><strong>Instructions</strong></h2>
    <p style="text-align: left;">
      Welcome to this experiment! On the following pages, you will see a series of computer-generated faces.
    </p>
    <p style="text-align: left;">
    Your task is to select which of the two faces appears more <strong>morally good</strong> to you. 
    </p>
    <p style="text-align: left;">
      <strong>
      To select, press the 'f' key for the left face, and the 'j' key for the right face. We are interested in your personal opinions.
      </strong>
    </p>`
  ],
};

const instructionsEvilComprehensionCheck = {
  type: jsPsychSurveyMultiChoice,
  questions: [
    {
      name: 'evil_comp_check_1',
      prompt: '<strong><i class="fa-solid fa-circle-question"></i>&nbsp;&nbsp;For each statement, your task is to:</strong>',
      options: [
        "Judge which face appears more morally good.",
        "Judge which face appears more morally bad.",
        "Judge which face appears more familiar.",
        "Judge which face appears more attractive."
      ],
      correct: 'Judge which face appears more morally bad.',
      hint: `That's not quite right. Remember, you are judging which face appears more <strong>morally bad</strong>`,
      required: true,
    }
  ],
  preamble:
    `<h2 style="text-align: center;">Instructions Review</h2> 
    <p style="text-align: left;"> 
      The experiment will begin on the next page.
      
      As a reminder, you will see a series of computer-generated faces and you will have to select the one that appears more morally bad.<br><br>
    </p>`
};

const instructionsSaintlyComprehensionCheck = {
  type: jsPsychSurveyMultiChoice,
  questions: [
    {
      name: 'saintly_comp_check_1',
      prompt: '<strong><i class="fa-solid fa-circle-question"></i>&nbsp;&nbsp;For each statement, your task is to:</strong>',
      options: [
        "Judge which face appears more morally good.",
        "Judge which face appears more morally bad.",
        "Judge which face appears more familiar.",
        "Judge which face appears more attractive."
      ],
      correct: 'Judge which face appears more morally good.',
      hint: `That's not quite right. Remember, you are judging which face appears more <strong>morally good</strong>`,
      required: true,
    }
  ],
  preamble:
    `<h2 style="text-align: center;">Instructions Review</h2> 
    <p style="text-align: left;"> 
      The experiment will begin on the next page.
      
      As a reminder, you will see a series of computer-generated faces and you will have to select the one that appears more morally good.<br><br>
    </p>`
};

// Intertrial Break Page
function newTrialPage(trialIndex) {
  return {
    type: jsPsychInstructions,
    pages: [`
          <h2><strong>Trial ` + (trialIndex + 1) + `/` + trials.length + ` Completed!</strong></h2>
          <p style="text-align: left;">
            Great Job! You are now half way done! 
            Please click the button below to continue.
          </p>`
    ],
    show_clickable_nav: true
  };
};

// INDIVIDUAL DIFFERENCES //

// IRI - Perspective Taking //
const iriQuestions = {
  type: jsPsychSurveyMultiChoice,
  questions: [
    {
      name: 'iri-1',
      prompt:
        `<p class="jspsych-survey-multi-choice-question">
        I try to look at everybody's side of a disagreement before I make a decision.
        </p>`,
      options: iriResponses,
      horizontal: true
    },
    {
      name: 'iri-2',
      prompt:
        `<p class="jspsych-survey-multi-choice-question">
        I sometimes try to understand my friends better by imagining how things
        look from their perspective.
        </p>`,
      options: iriResponses,
      horizontal: true
    },
    {
      name: 'iri-3',
      prompt:
        `<p class="jspsych-survey-multi-choice-question">
        When I'm upset at someone, I usually try to 'put myself in his shoes' for a
        while.
        </p>`,
      options: iriResponses,
      horizontal: true
    },
    {
      name: 'iri-4',
      prompt:
        `<p class="jspsych-survey-multi-choice-question">
        Before criticizing somebody, I try to imagine how I would feel if I were in
        their place.
        </p>`,
      options: iriResponses,
      horizontal: true
    }
  ],
  randomize_question_order: true,
  request_response: true,
  preamble:
    `<p class="jspsych-survey-multi-choice-preamble">
      Please indicate how well each of the following statements
      describe you using the scale provided:
    </p>`,
  scale_width: 500,
  on_finish: function (data) {
    let iriData = data.response;

    iriData = {
      iri_1: iriData['iri-1'],
      iri_2: iriData['iri-2'],
      iri_3: iriData['iri-3'],
      iri_4: iriData['iri-4']
    };

    jsPsych.data
      .getDataByTimelineNode(jsPsych.getCurrentTimelineNodeID())
      .addToAll(iriData);
  }
};

// Evil 
if (evilMoralCondition === 'evil') {

  // Instructions
  timeline.push(
    instructionsEvil,
    instructionsEvilComprehensionCheck
  );

  // Pre-Sampling Individual Differences
    timeline.push(iriQuestions);
  }

  // Sampling Task
  for (let trialIndex = 0; trialIndex < trials.length; trialIndex++) {
    timeline.push(
      selectionTask(trialIndex, evilMoralCondition),
    );
    if (trialIndex != trials.length - 1) {
      timeline.push(
        newTrialPage(trialIndex)
      );
    };
  };

  // Post-Sampling Individual Differences
  if (individualDifferencesOrderCondition == "after") {
    timeline.push(iriQuestions);
  }
  
// SAINTLY
  else if (evilMoralCondition === 'saintly') {
  
  // Instructions
  timeline.push(
    instructionsSaintly,
    instructionsSaintlyComprehensionCheck
  );

  // Pre-Sampling Individual Differences
  if (individualDifferencesOrderCondition == "before") {
    timeline.push(iriQuestions);
  }

  // Sampling Task
  for (let trialIndex = 0; trialIndex < trials.length; trialIndex++) {
    timeline.push(
      selectionTask(trialIndex, evilMoralCondition),
    );
    if (trialIndex != trials.length - 1) {
      timeline.push(
        newTrialPage(trialIndex)
      );
    };
  };

  // Post-Sampling Individual Differences
  if (individualDifferencesOrderCondition == "after") {
    timeline.push(iriQuestions);
  }
};

// DEMOGRAPHICS //

const demographicsQuestions = {
  type: jsPsychSurveyHtmlForm,
  preamble:
    `<p class="jspsych-survey-multi-choice-preamble">
      Using the scales provided, please respond to each question about you as an individual:
    </p>`,
  html: `
        <!-- Age -->

        <div class="jspsych-survey-multi-choice-question">
          <label for="age">How old are you?</label><br>
          <input 
            type="number" 
            id="age" 
            name="age" 
            min="18" max="100" 
            style="padding: 5px; width: 40px;" 
            class="incomplete"
            oninput="this.classList.remove('incomplete');"
          >
        </div>
        

        <!-- Race/Ethnicity -->

        <div class="jspsych-survey-multi-choice-question">
          <legend>Please indicate how you identify yourself:</legend>
          <div class="jspsych-survey-multi-choice-option">
            <input 
              type="checkbox" 
              id="race-ethnicity-indigenous" 
              name="race-ethnicity-indigenous" 
              value="Indigenous American or Alaskan Native" 
              class="demographics-race-ethnicity incomplete"
              oninput="
                let demographicsRaceEthnicity = document.querySelectorAll(
                  '.demographics-race-ethnicity'
                );
                for (let i = 0; i < demographicsRaceEthnicity.length; i++) {
                  demographicsRaceEthnicity[i].classList.remove('incomplete');
                };
              "
            >
            <label for="race-ethnicity-indigenous">Indigenous American or Alaskan Native</label>
          </div>
          <div class="jspsych-survey-multi-choice-option">
            <input 
              type="checkbox" 
              id="race-ethnicity-asian" 
              name="race-ethnicity-asian" 
              value="Asian or Asian-American" 
              class="demographics-race-ethnicity incomplete"
              oninput="
                let demographicsRaceEthnicity = document.querySelectorAll(
                  '.demographics-race-ethnicity'
                );
                for (let i = 0; i < demographicsRaceEthnicity.length; i++) {
                  demographicsRaceEthnicity[i].classList.remove('incomplete');
                };
              "
            >
            <label for="race-ethnicity-asian">Asian or Asian-American</label>
          </div>
          <div class="jspsych-survey-multi-choice-option">
            <input 
              type="checkbox" 
              id="race-ethnicity-black" 
              name="race-ethnicity-black" 
              value="African or African-American" 
              class="demographics-race-ethnicity incomplete"
              oninput="
                let demographicsRaceEthnicity = document.querySelectorAll(
                  '.demographics-race-ethnicity'
                );
                for (let i = 0; i < demographicsRaceEthnicity.length; i++) {
                  demographicsRaceEthnicity[i].classList.remove('incomplete');
                };
              "
            >
            <label for="race-ethnicity-black">African or African-American</label>
          </div>
          <div class="jspsych-survey-multi-choice-option">
            <input 
              type="checkbox" 
              id="race-ethnicity-native" 
              name="race-ethnicity-native" 
              value="Native Hawaiian or Pacific Islander" 
              class="demographics-race-ethnicity incomplete"
              oninput="
                let demographicsRaceEthnicity = document.querySelectorAll(
                  '.demographics-race-ethnicity'
                );
                for (let i = 0; i < demographicsRaceEthnicity.length; i++) {
                  demographicsRaceEthnicity[i].classList.remove('incomplete');
                };
              "
            >
            <label for="race-ethnicity-native">Native Hawaiian or other Pacific Islander</label>
          </div>
          <div class="jspsych-survey-multi-choice-option">
            <input 
              type="checkbox" 
              id="race-ethnicity-white" 
              name="race-ethnicity-white" 
              value="White" 
              class="demographics-race-ethnicity incomplete"
              oninput="
                let demographicsRaceEthnicity = document.querySelectorAll(
                  '.demographics-race-ethnicity'
                );
                for (let i = 0; i < demographicsRaceEthnicity.length; i++) {
                  demographicsRaceEthnicity[i].classList.remove('incomplete');
                };
              "
            >
            <label for="race-ethnicity-white">White</label>
          </div>
          <div class="jspsych-survey-multi-choice-option">
            <input 
              type="checkbox" 
              id="race-ethnicity-hispanic" 
              name="race-ethnicity-hispanic" 
              value="Hispanic/Latino/a/e/x" 
              class="demographics-race-ethnicity incomplete"
              oninput="
                let demographicsRaceEthnicity = document.querySelectorAll(
                  '.demographics-race-ethnicity'
                );
                for (let i = 0; i < demographicsRaceEthnicity.length; i++) {
                  demographicsRaceEthnicity[i].classList.remove('incomplete');
                };
              "
            >
            <label for="race-ethnicity-hispanic">Hispanic/Latino/a/e/x</label>
          </div>
          <div class="jspsych-survey-multi-choice-option">
            <input 
              type="checkbox" 
              id="race-ethnicity-other" 
              name="race-ethnicity-other" 
              value="Other" 
              class="demographics-race-ethnicity incomplete"
              oninput="
                let demographicsRaceEthnicity = document.querySelectorAll(
                  '.demographics-race-ethnicity'
                );
                for (let i = 0; i < demographicsRaceEthnicity.length; i++) {
                  demographicsRaceEthnicity[i].classList.remove('incomplete');
                };
              "
            >
            <label for="race-ethnicity-other">Other</label>
          </div>
          <div class="jspsych-survey-multi-choice-option">
            <input 
              type="checkbox"
              id="race-ethnicity-prefer-not" 
              name="race-ethnicity-prefer-not" 
              value="Prefer not to disclose" 
              class="demographics-race-ethnicity incomplete"
              oninput="
                let demographicsRaceEthnicity = document.querySelectorAll(
                  '.demographics-race-ethnicity'
                );
                for (let i = 0; i < demographicsRaceEthnicity.length; i++) {
                  demographicsRaceEthnicity[i].classList.remove('incomplete');
                };
              "
            >
            <label for="race-ethnicity-prefer-not">Prefer not to disclose</label>
          </div>
        </div>


        <!-- Gender -->
        
        <div class="jspsych-survey-multi-choice-question">
          <legend>With which gender do you most closely identify?</legend>
          <div class="jspsych-survey-multi-choice-option">
            <input 
              type="radio" 
              id="gender-man" 
              name="gender-man" 
              value="Man" 
              class="demographics-gender incomplete"
              oninput="
                let demographicsGender = document.querySelectorAll(
                  '.demographics-gender'
                );
                for (let i = 0; i < demographicsGender.length; i++) {
                  demographicsGender[i].classList.remove('incomplete');
                };
              "
            >
            <label for="gender-man">Man</label>
          </div>
          <div class="jspsych-survey-multi-choice-option">
            <input 
              type="radio" 
              id="gender-woman" 
              name="gender-woman" 
              value="Woman" 
              class="demographics-gender incomplete"
              oninput="
                let demographicsGender = document.querySelectorAll(
                  '.demographics-gender'
                );
                for (let i = 0; i < demographicsGender.length; i++) {
                  demographicsGender[i].classList.remove('incomplete');
                };
              "
            >
            <label for="gender-woman">Woman</label>
          </div>
          <div class="jspsych-survey-multi-choice-option">
            <input 
              type="radio" 
              id="gender-non-binary" 
              name="gender-non-binary" 
              value="Non-binary" 
              class="demographics-gender incomplete"
              oninput="
                let demographicsGender = document.querySelectorAll(
                  '.demographics-gender'
                );
                for (let i = 0; i < demographicsGender.length; i++) {
                  demographicsGender[i].classList.remove('incomplete');
                };
              "
            >
            <label for="gender-non-binary">Non-binary</label>
          </div>
          <div class="jspsych-survey-multi-choice-option">
            <input 
              type="radio" 
              id="gender-other" 
              name="gender-other" 
              value="Other" 
              class="demographics-gender incomplete"
              oninput="
                let demographicsGender = document.querySelectorAll(
                  '.demographics-gender'
                );
                for (let i = 0; i < demographicsGender.length; i++) {
                  demographicsGender[i].classList.remove('incomplete');
                };
              "
            >
            <label for="gender-other">Other</label>
          </div>
          <div class="jspsych-survey-multi-choice-option">
            <input 
              type="radio" 
              id="gender-prefer-not" 
              name="gender-prefer-not" 
              value="Prefer not to disclose" 
              class="demographics-gender incomplete"
              oninput="
                let demographicsGender = document.querySelectorAll(
                  '.demographics-gender'
                );
                for (let i = 0; i < demographicsGender.length; i++) {
                  demographicsGender[i].classList.remove('incomplete');
                };
              "
            >
            <label for="gender-prefer-not">Prefer not to disclose</label>
          </div>
        </div>


        <!-- Education -->
        
        <div class="jspsych-survey-multi-choice-question">
          <legend>
            What is the highest level of education you have received? 
            (If you are currently enrolled in school, please indicate the highest degree you have received)
          </legend>
          <div class="jspsych-survey-multi-choice-option">
            <input 
              type="radio" 
              id="education-less-high-school" 
              name="education-less-high-school" 
              value="Less than a high school diploma" 
              class="demographics-education incomplete"
              oninput="
                let demographicsEducation = document.querySelectorAll(
                  '.demographics-education'
                );
                for (let i = 0; i < demographicsEducation.length; i++) {
                  demographicsEducation[i].classList.remove('incomplete');
                };
              "
            >
            <label for="education-less-high-school">
              Less than a high school diploma
            </label>
          </div>

          <div class="jspsych-survey-multi-choice-option">
            <input 
              type="radio" 
              id="education-high-school" 
              name="education-high-school" 
              value="High school degree or equivalent (e.g. GED)" 
              class="demographics-education incomplete"
              oninput="
                let demographicsEducation = document.querySelectorAll(
                  '.demographics-education'
                );
                for (let i = 0; i < demographicsEducation.length; i++) {
                  demographicsEducation[i].classList.remove('incomplete');
                };
              "
            >
            <label for="education-high-school">
              High school degree or equivalent (e.g. GED)
            </label>
          </div>

          <div class="jspsych-survey-multi-choice-option">
            <input 
              type="radio" 
              id="education-some-college" 
              name="education-some-college" 
              value="Some college, no degree" 
              class="demographics-education incomplete"
              oninput="
                let demographicsEducation = document.querySelectorAll(
                  '.demographics-education'
                );
                for (let i = 0; i < demographicsEducation.length; i++) {
                  demographicsEducation[i].classList.remove('incomplete');
                };
              "
            >
            <label for="education-some-college">
              Some college, no degree
            </label>
          </div>

          <div class="jspsych-survey-multi-choice-option">
            <input 
              type="radio" 
              id="education-associate" 
              name="education-associate" 
              value="Associate Degree (e.g. AA, AS)" 
              class="demographics-education incomplete"
              oninput="
                let demographicsEducation = document.querySelectorAll(
                  '.demographics-education'
                );
                for (let i = 0; i < demographicsEducation.length; i++) {
                  demographicsEducation[i].classList.remove('incomplete');
                };
              "
            >
            <label for="education-associate">
              Associate Degree (e.g. AA, AS)
            </label>
          </div>

          <div class="jspsych-survey-multi-choice-option">
            <input 
              type="radio" 
              id="education-bachelors" 
              name="education-bachelors" 
              value="Bachelor's Degree (e.g. BA, BS)" 
              class="demographics-education incomplete"
              oninput="
                let demographicsEducation = document.querySelectorAll(
                  '.demographics-education'
                );
                for (let i = 0; i < demographicsEducation.length; i++) {
                  demographicsEducation[i].classList.remove('incomplete');
                };
              "
            >
            <label for="education-bachelors">
              Bachelor's Degree (e.g. BA, BS)
            </label>
          </div>
          
          <div class="jspsych-survey-multi-choice-option">
            <input 
              type="radio" 
              id="education-postgraduate" 
              name="education-postgraduate" 
              value="Postgraduate Degree (e.g. Master's Degree, Professional Degree, Doctorate Degree)" 
              class="demographics-education incomplete"
              oninput="
                let demographicsEducation = document.querySelectorAll(
                  '.demographics-education'
                );
                for (let i = 0; i < demographicsEducation.length; i++) {
                  demographicsEducation[i].classList.remove('incomplete');
                };
              "
            >
            <label for="education-postgraduate">
              Postgraduate Degree (e.g. Master's Degree, Professional Degree, Doctorate Degree)
            </label>
          </div>
        </div>
        
        <style id="jspsych-survey-multi-choice-css">
          .jspsych-survey-multi-choice-question { 
            margin-top: 2em; 
            margin-bottom: 2em; 
            text-align: left; 
          } .jspsych-survey-multi-choice-option { 
            font-size: 10pt; 
            line-height: 2; 
          } .jspsych-survey-multi-choice-horizontal 
            .jspsych-survey-multi-choice-option { 
            display: inline-block; 
            margin-left: 1em; 
            margin-right: 1em; 
            vertical-align: top; 
            text-align: center; 
          } label.jspsych-survey-multi-choice-text input[type='radio'] {
            margin-right: 1em;
          }
        </style>
      `,
  button_label: 'Next',
  request_response: true,
  on_finish: function (data) {
    let demographicsData = data.response;

    // Age
    const age = Number(demographicsData['age']);

    // Gender
    let gender = '';
    if (demographicsData['gender-man']) {
      gender = 'Man';
    } else if (demographicsData['gender-woman']) {
      gender = 'Woman';
    } else if (demographicsData['gender-non-binary']) {
      gender = 'Non-Binary';
    } else if (demographicsData['gender-other']) {
      gender = 'Other';
    }

    // Create a new object with the formatted data
    demographicsData = {
      age: age,
      race_ethnicity_indigenous: demographicsData['race-ethnicity-indigenous'],
      race_ethnicity_asian: demographicsData['race-ethnicity-asian'],
      race_ethnicity_black: demographicsData['race-ethnicity-black'],
      race_ethnicity_native: demographicsData['race-ethnicity-native'],
      race_ethnicity_white: demographicsData['race-ethnicity-white'],
      race_ethnicity_hispanic: demographicsData['race-ethnicity-hispanic'],
      race_ethnicity_other: demographicsData['race-ethnicity-other'],
      race_ethnicity_na: demographicsData['race-ethnicity-prefer-not'],
      gender: gender
    };

    jsPsych.data
      .getDataByTimelineNode(jsPsych.getCurrentTimelineNodeID())
      .addToAll(demographicsData);
  }
};

timeline.push(demographicsQuestions);


const politicsQuestions = {
  type: jsPsychSurveyMultiChoice,
  questions: [
    {
      name: 'political-ideology-economic',
      prompt: `
            <p class="jspsych-survey-multi-choice-question">
              Which response best captures your political beliefs surrounding <strong>economic</strong> issues?
            </p>`,
      options: politicalResponses,
      horizontal: true
    },
    {
      name: 'political-ideology-social',
      prompt: `
            <p class="jspsych-survey-multi-choice-question">
              Which response best captures your political beliefs surrounding <strong>social</strong> issues?
            </p>`,
      options: politicalResponses,
      horizontal: true
    },
    {
      name: 'political-ideology-overall',
      prompt: `
            <p class="jspsych-survey-multi-choice-question">
              Which response best captures your <strong>overall</strong> political beliefs?
            </p>`,
      options: politicalResponses,
      horizontal: true
    }
  ],
  preamble: `
        <p class="jspsych-survey-multi-choice-preamble">
          Please answer the following questions about your political ideology:
        </p>`,
  request_response: true,
  on_finish: function (data) {
    let politicalData = data.response;

    politicalData = {
      political_ideology_economic: politicalData['political-ideology-economic'],
      political_ideology_social: politicalData['political-ideology-social'],
      political_ideology_overall: politicalData['political-ideology-overall']
    };

    jsPsych.data
      .getDataByTimelineNode(jsPsych.getCurrentTimelineNodeID())
      .addToAll(politicalData);
  }
};

timeline.push(politicsQuestions);


const demandEffectsQuestions = {
  type: jsPsychSurveyMultiChoice,
  questions: [
    {
      name: 'pressure',
      prompt:
        `<p class="jspsych-survey-multi-choice-question">
            Did you feel pressure to respond in a particular way to any of the questions?
          </p>`,
      options: demandEffectsResponses,
      horizontal: true
    }
  ],
  randomize_question_order: true,
  request_response: true,
  scale_width: 500,
  preamble:
    `<p class="jspsych-survey-multi-choice-preamble">
        For these final questions, please answer as honestly as you can.
        The answers to these questions will <strong>not</strong> affect whether or not you receive credit/payment for participation!
      </p>`,
  on_finish: function (data) {
    let demandEffectsData = data.response;

    demandEffectsData = {
      pressure: demandEffectsData['pressure']
    };

    jsPsych.data
      .getDataByTimelineNode(jsPsych.getCurrentTimelineNodeID())
      .addToAll(demandEffectsData);
  }
};

timeline.push(demandEffectsQuestions);


// Guess Study Purpose / Questions + Comments
const feedback = {
  type: jsPsychSurveyText,
  questions: [
    {
      name: 'guess-study-purpose',
      prompt:
        `<p class="jspsych-survey-multi-choice-question" style='text-align: "center !important;"'>
          What do you think this study was about?
        </p>`,
      rows: 10
    },
    {
      name: 'feedback',
      prompt:
        `<p class="jspsych-survey-multi-choice-question" style='text-align: "center !important;"'>
          Do you have any additional comments? We appreciate any and all feedback!
        </p>`,
      rows: 10
    }
  ],
  on_finish: function (data) {
    let purposeFeedbackData = data.response;

    purposeFeedbackData = {
      guess_study_purpose: purposeFeedbackData['guess-study-purpose'],
      feedback: purposeFeedbackData['feedback']
    };

    jsPsych.data
      .getDataByTimelineNode(jsPsych.getCurrentTimelineNodeID())
      .addToAll(purposeFeedbackData);
  }
}

timeline.push(feedback);

// Exit fullscreen
const exitFullscreen = {
  type: jsPsychFullscreen,
  fullscreen_mode: false,
  delay_after: 0
};

timeline.push(exitFullscreen);

// DataPipe conclude data collection
const save_data = {
  type: jsPsychPipe,
  action: "save",
  experiment_id: "oA2BJCIcu8jQ",
  filename: filename,
  data_string: () => jsPsych.data.get().csv(),
  on_finish: function (data) {
    function countdown(start, end) {
      const timer = setInterval(function() {
        if (start <= end) {
          clearInterval(timer);
        } else {
          start--;
          document.getElementById("countdown").innerHTML = start;
        }
      }, 1000);
    }
    
    countdown(5, 0);

    jsPsych.endExperiment(
      `<p class="jspsych-center">
        Thanks for participating! You will be redirected in <span id="countdown">5</span> seconds.
      </p>`
    );
    setTimeout(function () {
      window.location.href = "https://app.prolific.com/submissions/complete?cc=CNN3F4P4";
    }, 5000)
  }
};

timeline.push(save_data);

// Preload all images
const imageSet = avatarPhotos;

jsPsych.pluginAPI.preloadImages(imageSet, function () {
  startExperiment();
});

// Function to initialize the experiment; will be called once all images are preloaded
function startExperiment() {
  jsPsych.run(timeline);
};


///////////////// other script that is RC

  /* Parameters for the Evaluative Conditioning part */
  var delayIti = 1000;  // inter-trial-interval for trials
  var delayTrial = 2500; // duration of each trial
  var numOfUS = 8; // number of US to be paired with each CS

  /* Parameters for the Reverse Correlation task */
  var numOfPairsRC02 = 350;  // Total number of pair images images (inv & ori) = 350

  /* Material */

  // CS stimuli 
  var CS_45_Andy = [
  "cs_faces/cs_45_Andy.png", 
  "cs_faces/cs_55_John.png"
  ];

 var CS_45_John = [
  "cs_faces/cs_45_John.png", 
  "cs_faces/cs_55_Andy.png"
  ];

  // preload
  preloadimages.push(CS_45_Andy, CS_45_John);

  // randomize order
  CS_45_Andy = _.shuffle(CS_45_Andy); 
  CS_45_John = _.shuffle(CS_45_John); 

  /* Functions */
  // duplicate elements of an array n times
  // see https://stackoverflow.com/questions/56330349/how-to-duplicate-elements-in-a-js-array-without-creating-dependent-elements?
  function duplicateElements(elementsArray, times) {
    var newArray = [];
    for (let index = 0; index < elementsArray.length; index++) {
      var currentElement = elementsArray[index];
      var currentType = typeof currentElement
      for (let index = 0; index < times; index++) {
        if (currentType !== "object" && currentType) {
          newArray.push(currentElement)
        } else if (currentType === "object" && currentType) {
          newArray.push({ ...currentElement })
        }
      }
    }
    return newArray;
  }


/* RC PROCEDURE */
 var nameOrder = nameOrder == null ? _.sample(["AndyFirst", "JohnFirst"]) : nameOrder;

    if (nameOrder == "AndyFirst") {
        var name1 = "Andy";
        var name2 = "John";
    } else {
        var name1 = "John";
        var name2 = "Andy";
    };


  /* General INSTRUCTIONS */

  var Quit_expe = {
    type: "html-keyboard-response",
    post_trial_gap: 300,
    choices: [32],
    on_load: function() {
          $('.jspsych-content-wrapper').css({ "height": "900px" });
    },
    stimulus: function() {
      var html = "";
      html += "<h1>Before starting...</h1>";
      html += "<p class='justify'>You can quit the study at any time by closing the browser window. However, please be aware ";
      html += "that this will <b>end your participation</b>. If you are certain that you want to quit or encounter technical issues ";
      html += "that force you to quit, <b>you can still receive a partial reward proportionate to the time you actually spent</b> on ";
      html += "the study. If this occurs, please take the following steps: Return the study via the Prolific study page as ";
      html += "quickly as possible (please do not submit unless you have completed the study and received a completion code). ";
      html += "Send a message to the researcher via the Prolific study page, stating that you completed part of the study ";
      html += "(this will ensure that the researcher knows you should receive a partial reward). </br></br> ";
      html += "<p></br>Press <span class='light-keys'><kbd>space</kbd></span> to continue</p>";
      return html;
    },
  }; 

  var Instr_gene1 = {
    type: "html-keyboard-response",
    post_trial_gap: 300,
    choices: [32],
    stimulus: function() {
      var html = "";
      html += "<h1>About this study</h1>";
      html += "<p class = 'justify'>In this study, you will complete two tasks and answer a few questions. ";
      html += "The whole study should last around <b>20-22 minutes</b>. Note that it is extremely important that ";
      html += "you remain <b>fully concentrated</b> during the entire study.</b></p>";
      html += "<p></br>Press <span class='light-keys'><kbd>space</kbd></span> to continue</p>";
      return html;
    },
  };


  /* RC INSTRUCTIONS */

  var Instr_RC_gene = {
    type: "html-keyboard-response",
    post_trial_gap: 300,
    choices: [32],
    on_load: function() {
          $('body').css({ "cursor": "auto" });
    },
    stimulus: function () {
        var html = "";
            html += "<h1>TASK 2: Recognition task</h1>";
            html += "<p class = 'justify'>Task 1 is now over. In this task, we will present you a series of faces similar to the one presented below. ";
            html += "At each trial, we will present you two faces. ";
            html += "Again, these faces have been deliberately blurred but with a different kind of blur. ";
            html += "As a result, <b>the two faces will look rather similar to each other, yet these faces are different.</b></p>";
            html += "<img width='200' style='padding: 0px' src='" + './img/faceOri200.jpg?raw=1' + "'>";
            html += "<p></br>Press <span class='light-keys'><kbd>space</kbd></span> to continue</p>";
            return html;
        },
    };
     
  var Instr_RC1 = {
    type: "html-keyboard-response",
    post_trial_gap: 300,
    choices: [32],
    stimulus: function () {
      var html = "";
      html += "<h1>TASK 2: Recognition task (part 1/2) </h1>";
      html += "<p class='justify'>In this first part, your task will be to select, in each trial, <b>the face that looks the most similar to <u>"+name1+"</u> that you saw previously in TASK 1. </b>";
      html += "Use your mouse to make a choice.</p>";
      html += "<p class = 'justify'>Before you start, please note that: </br>";
      html += "<b>There are no good or bad answers!</b> ";
      html += "You just have to make a choice as <b>intuitively</b> as possible. ";
      html += "On average, for each trial, participants take about <b>1 second</b> ";
      html += "to select a face. Please <b>try to maintain a similar response time</b>.</br></br>";
      html += "In this part, you will have to peform a total of 400 trials. ";
      html += "Please remain <b>fully focused during the whole task.</b></p>";
      html += "<p></br>Press <span class='light-keys'><kbd>space</kbd></span> to continue</p>";
      return html;
    },
  };

  var Instr_RC2 = {
    type: "html-keyboard-response",
    post_trial_gap: 300,
    choices: [32],
      on_load: function() {
          $('.jspsych-content-wrapper').css({ "width": "900px" });
          $(".jspsych-content").css("max-width", "90%");
    },
    stimulus: function () {
      var html = "";
      html += "<h1>TASK 2: Recognition task (part 2/2) </h1>";
      html += "<p class='justify'>The first part of TASK 2 is now over. In this second part, your task will be to select, in each trial, <b>the face that looks the most similar to <u>"+name2+"</u> that you saw previously in TASK 1. </b>";
      html += "Again, use your mouse to make a choice.</p>";
      html += "<p class = 'justify'>Keep in mind that: </br>";
      html += "<b>There are no good or bad answers!</b> ";
      html += "You just have to make a choice as <b>intuitively</b> as possible. ";
      html += "On average, for each trial, participants take about <b>1 second</b> ";
      html += "to select a face. Please <b>try to maintain a similar response time</b>.</br></br>";
      html += "In this part, you will have to peform a total of 400 trials. ";
      html += "Please remain <b>fully focused during the whole task</b>.</p>";
      html += "<p></br>Press <span class='light-keys'><kbd>space</kbd></span> to continue</p>";
      return html;
    },
  };

  /* Questions INSTRUCTIONS */
  var Instr_Quest = {
    type: "html-keyboard-response",
    post_trial_gap: 300,
    choices: [32],
    on_load: function() {
          $('.jspsych-content-wrapper').css({ "width": "900px" });
          $(".jspsych-content").css("max-width", "90%");
    },
    stimulus: function() {
      var html = "";
      html += "<p class='justify'>TASK 2 is over. Now, we will ask you a few questions about the previous tasks and about yourself. ";
      html += "It is extremely important that you try to answer <b>as honestly and as spontaneously as possible.</b></br></br>";
      html += "<p></br>Press <span class='light-keys'><kbd>space</kbd></span> to begin</p>";
      return html;
    },
  };

  // EC ---------------------------------------------------------------------------------------------------------------
  var evacond = {
    timeline_variables: stims,
    randomize_order: true,
    choices: jsPsych.NO_KEYS,
    trial_duration: delayTrial,
    post_trial_gap: delayIti,
    repetitions: 2, // total: 32 trials
    on_load: function () {
      $('body').css({ "cursor": "none" });
      $('.jspsych-content').css({ "max-width": "100%" });
    },
    timeline: [{
      type: 'html-keyboard-response',
      stimulus: function () {
        if (CSposition == "LEFT") {
          var leftImg = jsPsych.timelineVariable('CS', true);
          var rightImg = jsPsych.timelineVariable('US', true);
        } else {
          var leftImg = jsPsych.timelineVariable('US', true);
          var rightImg = jsPsych.timelineVariable('CS', true);
        };
        html = '';
        html += "<img class='paringsImgsLeft' src='" + leftImg + "'>";
        html += "<img class='paringsImgsRight' src='" + rightImg + "'>";
        return html;
      },
      on_finish: function (data) {
        $('.jspsych-content').css({ "max-width": "90%" });
        data.task = "evacond";
        data.CS = jsPsych.timelineVariable('CS', true);
        data.US = jsPsych.timelineVariable('US', true);
        data.CSposition = jsPsych.timelineVariable('CSposition', true);
      },
    }]
  };


// RC ---------------------------------------------------------------------------------------------------------------
    /* Generate RC trials */
    var imgsRC02 = _.range(1, numOfPairsRC02 + 1); // generate numerical sequence

    imgsRC02 = imgsRC02.map(function (e) { return ['./img/faceOri' + e + '.jpg', './img/faceInv' + e + '.jpg'] }); // pairs ori and inv
    imgsRC02 = _.flattenDeep(imgsRC02);

    // preload
    preloadimages.push(imgsRC02);

    // Create chunks
    //imgsRC02 = _.chunk(imgsRC02, 02); // 1 ori + 1 inv = 2 faces per trial

    var RC02_stim = [];
    imgsRC02.map(function (e) { RC02_stim.push({ trialImgs: e }) });

    /* RC */
    var cssRC = "rcimg-02";
    var imgWidth = 512;
    var RCstim = RC02_stim;
    var numOfPairs = numOfPairsRC02;
    
    var i = 1;
    var RC1 = {
        timeline_variables: RCstim,
        randomize_order: true,
        data: {
            task: 'RC1',
            numOfPairs: numOfPairs,
            nameOrder: nameOrder
        },
        timeline: [{
            type: 'html-mouse-response',
            on_load: function () {
                        $('.jspsych-content-wrapper').css({ "width": "1100px" });
                        $('.jspsych-content').css({ "max-width": "100%" });
            },
            stimulus: function () {
                html = "";
                html += "<p>Choose the face that looks the most like <b>"+name1+"</b>:</p>";
                jsPsych.timelineVariable('trialImgs', true).map(function (e) {
                    html += "<img class='" + cssRC + "' src='" + e + "'>";
                });
                html += "</br>Trial: " + i + "/" + numOfPairs + "</br>";
                i += 1;
                return html;
            },
        }]
    };

var ii = 1;
    var RC2 = {
        timeline_variables: RCstim,
        randomize_order: true,
        data: {
            task: 'RC2',
            numOfPairs: numOfPairs,
            nameOrder: nameOrder
        },
        timeline: [{
            type: 'html-mouse-response',
            on_load: function () {
                        $('.jspsych-content-wrapper').css({ "width": "1100px" });
                        $('.jspsych-content').css({ "max-width": "100%" });
            },
            stimulus: function () {
                html = "";
                html += "<p>Choose the face that looks the most like <b>"+name2+"</b>:</p>";
                jsPsych.timelineVariable('trialImgs', true).map(function (e) {
                    html += "<img class='" + cssRC + "' src='" + e + "'>";
                });
                html += "</br>Trial: " + ii + "/" + numOfPairs + "</br>";
                ii += 1;
                return html;
            },
        }]
    };



  var Prolific_reported = {
        timeline: [{
            type: 'survey-text',
            questions: [{ prompt: 'Please indicate your Prolific ID:', rows: 3, columns: 60 }],
            button_label: "continue",
        }],
        loop_function: function (data) {
            var res = data.values()[0].responses;
            var res = JSON.parse(res).Q0;
            if (res == "") {
                alert("Please answer the question");
                return true;
            }
        },
        on_finish: function (data) {
            jsPsych.data.addProperties({
                Prolific_reported: JSON.parse(data.responses).Q0,
            });
        },
    };



