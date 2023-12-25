<!-- GenerationOutput.svelte -->
<script>
    import { generatedImageUrl, isGenerating, isError } from "./store.js";
    import { SpinLine } from "svelte-loading-spinners";

    const loadingTemplates = [
        "wrinkling monkey brain...",
        "hohoho",
        "moooooo",
        "watching grass grow",
        "看煮粥",
        "🐒",
        "🐵",
        "🙈",
        "🙉",
        "🙊",
    ];

    // Function to get a random loading message
    function getRandomLoadingMessage() {
        const randomIndex = Math.floor(Math.random() * loadingTemplates.length);
        return loadingTemplates[randomIndex];
    }

    // Get a random loading message
    let randomLoadingMessage = getRandomLoadingMessage();
</script>

{#if $generatedImageUrl}
    <div class="generation-output">
        <img src={$generatedImageUrl} alt="Generated Monkey Art" />
    </div>
{:else if $isGenerating}
    <div class="generation-output">
        <SpinLine size="60" color="#FF3E00" unit="px" duration="1s" />
        <br />
        <p>{randomLoadingMessage}</p>
    </div>
{:else if $isError}
    <div class="generation-output">
        <p>something dun goofed. let monta know.</p>
    </div>
{/if}

<style>
    @import url("https://fonts.googleapis.com/css2?family=Baloo+Tamma+2:wght@400;500&display=swap");

    .generation-output {
        transition: all 0.5s ease-in-out;
        width: 300px;
        height: 300px;
        border: 2px dashed #ffc107; /* Monkey yellow */
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin: 1rem;
        background-color: #fff3e0; /* Light monkey themed background */
        box-shadow: 0px 0px 10px 5px rgba(255, 193, 7, 0.2); /* Soft shadow */
        border-radius: 15px; /* Rounded corners */
        font-family: "Baloo Tamma 2", cursive; /* Fun, playful font */
    }

    .generation-output img {
        max-width: 100%;
        max-height: 100%;
        border-radius: 15px; /* Rounded corners for the image */
    }

    .generation-output p {
        color: #4e342e; /* Dark monkey brown */
        text-align: center;
        font-size: 1.2rem;
        margin-top: 1rem;
    }

    /* Keyframes for a simple bounce animation */
    @keyframes bounce {
        0%,
        20%,
        50%,
        80%,
        100% {
            transform: translateY(0);
        }
        40% {
            transform: translateY(-30px);
        }
        60% {
            transform: translateY(-15px);
        }
    }

    /* Applying bounce animation to the spinner */
    SpinLine {
        animation: bounce 2s infinite;
    }
</style>
