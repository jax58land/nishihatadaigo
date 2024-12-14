const questions = [
    {
        story: "謎の廃墟で、目の前のモンスターが！",
        question: "正しい問いかけを選んでください。",
        options: ["どうしてここにいるの？", "君の名前は？", "何してるの？"],
        answer: 1,
        image: "images/ruins.jpg",
        failure: {
            title: "失敗：モンスターが混乱！",
            message: "モンスターはさらに混乱し暴れ出した...",
            image: "images/failure1.jpg"
        }
    },
    {
        story: "彼は少しずつ記憶を取り戻していきます。「ﾎﾞｸは…ﾄﾞｺｶでｳﾀｯﾃｲﾀ気がｽﾙ」",
        question: "次に何をすべき？",
        options: ["初心LOVEを歌う", "ウルリルラリラリを歌う", "染みを歌う"],
        answer: 0,
        image: "images/forest.jpg",
        failure: {
            title: "失敗：モンスターが激怒！",
            message: "無理に思い出させたせいで、彼は叫び声を上げながら暴走した。",
            image: "images/failure2.jpg"
        }
    },
    {
        story: "彼の記憶の断片から、アイドルだった事に気づきます。しかし感情がまだ不安定です。",
        question: "どう彼をサポートする？",
        options: ["一緒に踊る", "TikT⚪︎kを見せる", "適当に踊ってみる"],
        answer: 0,
        image: "images/stage.jpg",
        failure: {
            title: "失敗：踊りが大失敗！",
            message: "モンスターは転倒してさらに怒り出しました。",
            image: "images/failure3.jpg"
        }
    },
    {
        story: "西畑は大切な人の名前を思い出そうとしています。「…あの人達の名前は…？」",
        question: "次のヒントを与える選択肢は？",
        options: ["正門、、、", "永瀬、、、", "なにわ、、、"],
        answer: 2,
        image: "images/memory.jpg",
        failure: {
            title: "失敗：彼の心が閉ざされる",
            message: "無理に名前を思い出させようとした結果、西畑は再び混乱して心を閉ざしてしまいました。",
            image: "images/failure4.jpg"
        }
    },
    {
        story: "彼の記憶と感情はほぼ回復しました。最後の選択が彼の未来を決めます。",
        question: "最後にどうするべき？",
        options: ["アイドルの西畑大吾が好き", "今の西畑大吾が好き", "どんな西畑大吾も好き"],
        answer: 0,
        image: "images/final.jpg",
        failure: {
            title: "失敗：最悪の展開",
            message: "彼はモンスターのまま王として君臨し、2度と手の届かない場所へ。",
            image: "images/failure5.jpg"
        }
    }
];

let currentQuestion = 0;
let score = 0;
const bgm = document.getElementById("bgm");

// BGMの音量を1/4に設定
bgm.volume = 0.25;

// ゲームの初期化
function initializeGame() {
    document.getElementById("start-section").style.display = 'none';
    startGame();
}

function startGame() {
    bgm.play();
    resetGame(); // リセット処理
    showQuestion(); // 1問目を表示
}

function resetGame() {
    currentQuestion = 0;
    score = 0;

    // すべてのセクションを非表示に設定
    document.getElementById("failure-section").style.display = 'none';
    document.getElementById("result-section").style.display = 'none';
    document.getElementById("reward-section").style.display = 'none';
    document.getElementById("story-section").style.display = 'none';
    document.getElementById("question-section").style.display = 'none';

    // 必要なセクションだけ表示
    document.getElementById("story-section").style.display = 'block';
    document.getElementById("question-section").style.display = 'block';
}

function showQuestion() {
    const storyElem = document.getElementById("story");
    const questionElem = document.getElementById("question");
    const optionsElem = document.getElementById("options");
    const imageElem = document.getElementById("scene-image");

    const q = questions[currentQuestion];
    storyElem.textContent = q.story;
    questionElem.textContent = q.question;
    imageElem.src = q.image;
    optionsElem.innerHTML = '';

    q.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.textContent = opt;
        btn.onclick = () => checkAnswer(index);
        optionsElem.appendChild(btn);
    });
}

function checkAnswer(selected) {
    const q = questions[currentQuestion];

    if (selected === q.answer) {
        score++;
        currentQuestion++;
        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    } else {
        showFailure(q.failure);
    }
}

function showFailure(failure) {
    // 他のセクションを非表示に
    document.getElementById("story-section").style.display = 'none';
    document.getElementById("question-section").style.display = 'none';

    // 失敗セクションを表示
    const failureElem = document.getElementById("failure-section");
    failureElem.style.display = 'block';

    const failureTitleElem = document.getElementById("failure-title");
    const failureMessageElem = document.getElementById("failure-message");
    const failureImageElem = document.getElementById("failure-image");

    failureTitleElem.textContent = failure.title;
    failureMessageElem.textContent = failure.message;
    failureImageElem.src = failure.image;

    // 「もう一度挑戦する」で最初の問題に戻る
    document.getElementById("retry-btn").onclick = startGame;
}

function showResult() {
    // 他のセクションを非表示に
    document.getElementById("story-section").style.display = 'none';
    document.getElementById("question-section").style.display = 'none';

    // 結果セクションを表示
    const resultElem = document.getElementById("result-section");
    resultElem.style.display = 'block';

    const titleElem = document.getElementById("result-title");
    const messageElem = document.getElementById("result-message");

    if (score === questions.length) {
        titleElem.textContent = "感動のエンディング！";
        messageElem.textContent = "西畑大吾は人間に戻り、再びアイドルとして輝きました！";
        document.getElementById("reward-btn").onclick = showReward;
    } else {
        titleElem.textContent = "失敗エンディング...";
        messageElem.textContent = "西畑大吾は混乱したままモンスターの王として君臨しました。";
        document.getElementById("reward-btn").style.display = 'none';
    }
}

function showReward() {
    // 結果セクションを非表示
    document.getElementById("result-section").style.display = 'none';

    // 報酬セクションを表示
    const rewardElem = document.getElementById("reward-section");
    rewardElem.style.display = 'block';

    document.getElementById("restart-btn").onclick = () => {
        document.getElementById("start-section").style.display = 'block';
        document.getElementById("reward-section").style.display = 'none';
    };
}

// 初期化
document.getElementById("start-btn").onclick = initializeGame;