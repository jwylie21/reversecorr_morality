// This is the code for the competence version

// DEFINE GLOBAL VARIABLES
let timeline = [];

let trials = new Array(350)

// jsPsych Initialization
const jsPsych = initJsPsych({
  use_webaudio: false,
  display_element: 'jspsych-target',
  auto_preload: true,
  show_progress_bar: true,
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
let compMoralCondition = jsPsych.randomization.sampleWithoutReplacement(['notcomp', 'comp'], 1)[0];

jsPsych.data.addProperties({
  participantId: participantId,
  studyId: studyId,
  sessionId: sessionId,
  compMoralCondition: compMoralCondition
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
            You are being asked to participate in a research study titled “Social Judgment and Decision-Making”. 
            You were selected to participate in this project because you are an adult over age 18. 
            This study is sponsored by Boston College and the John Templeton Foundation.
            </p>
            <p style="text-align: left;">
            The purpose of this study is social decision-making, and specifically how people judge the decisions and 
            values of others. 
            This study will be conducted through this online survey. 
            The study should take you about 20 minutes to complete.
            </p>
            <p style="text-align: left;">
            There are no direct benefits to you, but you may feel gratified knowing that you helped further the scholarly 
            work in this research area. You will be compensated $3.10 for participating in this study.
            There are no costs to you associated with your participation.
            </p>
            <p style="text-align: left;">
            This Principal Investigator will exert all reasonable efforts to keep your responses and your identity confidential. 
            We may have access to, and may maintain in our data collection, your Prolific ID. 
            However, aside from your Prolific ID, we will not maintain within our research data any information that uniquely 
            identifies you, such as your name, location, or Internet Protocol (IP) address.
            In any report we publish, we will not include any information that will make it possible to identify a participant. 
            Data collected from the experiment will be coded to remove your name or any other personal identifiers. 
            All records will be secured in a locked cabinet in our lab. Access to the records will be limited to the researchers; 
            however, please note that regulatory agencies and the Boston College Institutional Review Board and internal Boston College 
            auditors may review the research records. Please also note the organization that operates your Internet survey platform may 
            retain your responses and, additionally, may maintain a link identifying you as the source of those responses. 
            Your user agreement with the survey platform organization may address this topic. Your participation is voluntary. 
            If you choose not to participate it will not affect your relations with Boston College.
            </p>
            <p style="text-align: left;">
            Some questions on the survey, such as comprehension questions, may be required in order to complete the survey 
            and receive compensation. However, you may still choose to end your participation in the study at any time.
            </p>
            <p style="text-align: left;">
            If you have questions or concerns concerning this research you may contact the Principal Investigator at 
            617-552-0240 or liane.young@bc.edu. If you have questions about your rights as a research participant, 
            you may contact the Office for Research Protections, Boston College, at 617-552-4778 or irb@bc.edu. 
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

// NOT COMP INSTRUCTIONS //
const instructionsEvil = {
  type: jsPsychInstructions,
  pages: [
    `<h2><strong>Instructions</strong></h2>
     <p style="text-align: left;">
       Welcome to the experiment! In this study, you will see a 
       series of pairs of computer-generated faces and be asked to answer a few questions. 
     </p>`,

    `<p style="text-align: left;">
      Your task is to select which of two faces appears more <strong>incompetent</strong> to you. There are no right or wrong answers, we are interested in your gut response. 
    </p>`,

    `<p style="text-align: left;">
    You will see <b>many</b> pairs of faces. We have included a progress bar so that you are aware of how many more you have left. We know this task is long, please try to stay focused and attentive. 
    </p>`,

    `<p style="text-align: left;">
      You will press the <strong>'f' key</strong> to select the face on the left, and the <strong>'j' key</strong> to select the face on the right. 
    </p>`,
  ],
  show_clickable_nav: true,
};

// COMPETENT INSTRUCTIONS //
const instructionsSaintly = {
    type: jsPsychInstructions,
    pages: [
      `<h2><strong>Instructions</strong></h2>
       <p style="text-align: left;">
         Welcome to the experiment! In this study, you will see a 
         series of pairs of computer-generated faces and be asked to answer a few questions. 
       </p>`,
  
      `<p style="text-align: left;">
      Your task is to select which of the two faces appears more <strong>competent</strong> to you. There are no right or wrong answers, we are interested in your gut response.
      </p>`,

      `<p style="text-align: left;">
      You will see <b>many</b> pairs of faces. We have included a progress bar so that you are aware of how many more you have left. We know this task is long, please try to stay focused and attentive. 
      </p>`,
  
      `<p style="text-align: left;">
        You will press the <strong>'f' key</strong> to select the face on the left, and the <strong>'j' key</strong> to select the face on the right. 
      </p>`,
    ],
    show_clickable_nav: true,
  };

const instructionsEvilComprehensionCheck = {
  type: jsPsychSurveyMultiChoice,
  questions: [
    {
      name: 'notcomp_comp_check_1',
      prompt: '<strong><i class="fa-solid fa-circle-question"></i>&nbsp;&nbsp;For each statement, your task is to:</strong>',
      options: [
        "Judge which face appears more competent.",
        "Judge which face appears more incompetent.",
        "Judge which face appears more familiar.",
        "Judge which face appears less attractive."
      ],
      correct: 'Judge which face appears more incompetent.',
      hint: `That's not quite right. Remember, you are judging which face appears more <strong>incompetent</strong>`,
      required: true
    },
    {
      name: 'notcomp_comp_check_2',
      prompt: '<strong><i class="fa-solid fa-circle-question"></i>&nbsp;&nbsp;What buttons should you press to make your selection?</strong>',
      options: [
        "The J key for selecting the left face, and the F key for selecting the right face.",
        "The F key for selecting the left face, and the J key for selecting the right face.",
        "The S key for selecting the left face, and the K key for selecting the right face."
      ],
      correct: 'The F key for selecting the left face, and the J key for selecting the right face.',
      hint: `That's not quite right. Remember, you should use the F key for selecting the left face, and the J key for selecting the right face.`,
      required: true
    }
  ],
  preamble: `<h2 style="text-align: center;">Instructions Review</h2>
    <p style="text-align: left;"> 
      The experiment will begin on the next page.
      As a reminder, you will see a series of computer-generated faces. These faces will be blurry and hard to make out. Your task is to select whichever one looks <strong>more</strong> incompetent even if they are hard to tell apart.<br><br>
    </p>`
};

const instructionsSaintlyComprehensionCheck = {
  type: jsPsychSurveyMultiChoice,
  questions: [
    {
      name: 'comp_comp_check_1',
      prompt: '<strong><i class="fa-solid fa-circle-question"></i>&nbsp;&nbsp;For each statement, your task is to:</strong>',
      options: [
        "Judge which face appears more competent.",
        "Judge which face appears more incompetent.",
        "Judge which face appears more familiar.",
        "Judge which face appears less attractive."
      ],
      correct: 'Judge which face appears more competent.',
      hint: `That's not quite right. Remember, you are judging which face appears more <strong>competent</strong>`,
      required: true
    },
    {
      name: 'comp_comp_check_2',
      prompt: '<strong><i class="fa-solid fa-circle-question"></i>&nbsp;&nbsp;What buttons should you press to make your selection?</strong>',
      options: [
        "The J key for selecting the left face, and the F key for selecting the right face.",
        "The F key for selecting the left face, and the J key for selecting the right face.",
        "The S key for selecting the left face, and the K key for selecting the right face."
      ],
      correct: 'The F key for selecting the left face, and the J key for selecting the right face.',
      hint: `That's not quite right. Remember, you should use the F key for selecting the left face, and the J key for selecting the right face.`,
      required: true
    }
  ],
  preamble: `<h2 style="text-align: center;">Instructions Review</h2>
    <p style="text-align: left;"> 
      The experiment will begin on the next page.
      As a reminder, you will see a series of computer-generated faces. These faces will be blurry and hard to make out. Your task is to select whichever one looks <strong>more</strong> competent even if they are hard to tell apart.<br><br>
    </p>`
};


// TASK 

function selectionTask(trialIndex, wording, randomized_indices) {
  // Randomize which image comes first (true means original first, false means inverted first)
  const originalFirst = Math.random() < 0.5;

  // Determine the order of the images based on the random value
  const firstImage = originalFirst 
      ? `images/rcic_avg_2022_00${randomized_indices[trialIndex]}_ori.png` 
      : `images/rcic_avg_2022_00${randomized_indices[trialIndex]}_inv.png`;

  const secondImage = originalFirst 
      ? `images/rcic_avg_2022_00${randomized_indices[trialIndex]}_inv.png` 
      : `images/rcic_avg_2022_00${randomized_indices[trialIndex]}_ori.png`;

  let trial_stimulus = `
      <div style="font-size:30px;">Which face looks more <strong>${wording}</strong>?</div>
      <br>
      <img src="${firstImage}">
      <img src="${secondImage}">
      <br>
      <br>
      <br>
      <br>
      Reminder: The <b>F</b> key is for the face on the left and the <b>J</b> key is for the face on the right
  `;

  let selection = {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: trial_stimulus,
      choices: ["f", "j"],
      //trial_duration: 5000,
      data: {
          index: randomized_indices[trialIndex],
          originalFirst
      }
  };

  return selection;
}

var fixation = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<div style="font-size:60px;text-align:center; height:500px; line-height:500px;">+</div>',
  choices: "NO_KEYS",
  trial_duration: function(){
    return jsPsych.randomization.sampleWithReplacement([750, 850, 950, 1050, 1150], 1)[0];
  },
  data: {
    task: 'fixation'
}
}

///////////////////////////////////////////// NOT COMP /////////////////////////////////////////////
if (compMoralCondition === 'notcomp') {

  // Instructions
  timeline.push(
    instructionsEvil,
    instructionsEvilComprehensionCheck
  );

  // Sampling Task - incompetent
  for (let trialIndex = 0; trialIndex < trials.length; trialIndex++) {
    timeline.push(
      fixation,
      selectionTask(trialIndex, "incompetent", randomized_indices),
    );
  };

}

///////////////////////////////////////////// SAINTLY /////////////////////////////////////////////
else if (compMoralCondition === 'comp') {
  
  // Instructions
  timeline.push(
    instructionsSaintly,
    instructionsSaintlyComprehensionCheck
  );

  // Sampling Task - competent
  for (let trialIndex = 0; trialIndex < trials.length; trialIndex++) {
    timeline.push(
        fixation,
        selectionTask(trialIndex, "competent", randomized_indices)
    );
  };

};

/////////////////////////////////////////////// DEMOGRAPHICS ///////////////////////////////////////////////
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

// Comments
const feedback = {
  type: jsPsychSurveyText,
  questions: [
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
   experiment_id: "g2TOq0qAEaKh", //updated as of oct 30
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
       window.location.href = "https://app.prolific.com/submissions/complete?cc=C1KP7M9Q"; //this is updated as of oct 30
     }, 5000)
   }
 };

timeline.push(save_data);

// Preload all images
// const imageSet = avatarPhotos;

// jsPsych.pluginAPI.preloadImages(imageSet, function () {
//   startExperiment();
// });

startExperiment();

// Function to initialize the experiment; will be called once all images are preloaded
function startExperiment() {
  jsPsych.run(timeline);
};