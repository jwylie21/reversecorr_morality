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
    on_load: function () {
        $('.jspsych-content-wrapper').css({ "height": "900px" });
    },
    stimulus: function () {
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
    stimulus: function () {
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
    on_load: function () {
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
        html += "<p class='justify'>In this first part, your task will be to select, in each trial, <b>the face that looks the most similar to <u>" + name1 + "</u> that you saw previously in TASK 1. </b>";
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
    on_load: function () {
        $('.jspsych-content-wrapper').css({ "width": "900px" });
        $(".jspsych-content").css("max-width", "90%");
    },
    stimulus: function () {
        var html = "";
        html += "<h1>TASK 2: Recognition task (part 2/2) </h1>";
        html += "<p class='justify'>The first part of TASK 2 is now over. In this second part, your task will be to select, in each trial, <b>the face that looks the most similar to <u>" + name2 + "</u> that you saw previously in TASK 1. </b>";
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
    on_load: function () {
        $('.jspsych-content-wrapper').css({ "width": "900px" });
        $(".jspsych-content").css("max-width", "90%");
    },
    stimulus: function () {
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
            html += "<p>Choose the face that looks the most like <b>" + name1 + "</b>:</p>";
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
            html += "<p>Choose the face that looks the most like <b>" + name2 + "</b>:</p>";
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