<script>
    import { onMount } from "svelte";
    import { generatedImageUrl, isGenerating } from "./store.js";

    let subject = "a happy little monkey";
    let activity = "";
    let style = "";
    let activityPlaceholder = "";
    let stylePlaceholder = "";

    let activityPrompts = [
        "eating a cake",
        "surfing",
        "doing a handstand",
        "playing piano",
        "playing chess",
    ];
    let stylePrompts = [
        "Miyazaki",
        "chinese ink",
        "van Gogh",
        "Picasso",
        "Rembrandt",
        "Monet",
        "Walt Disney",
    ];

    const API_URL = import.meta.env.VITE_API_URL;

    async function typePlaceholder(prompts, setPlaceholder, delayStart = 0) {
        await new Promise((r) => setTimeout(r, delayStart)); // Initial delay if needed

        while (true) {
            // Loop forever
            for (const prompt of prompts) {
                for (let i = 0; i <= prompt.length; i++) {
                    setPlaceholder(prompt.slice(0, i));
                    await new Promise((r) => setTimeout(r, 100)); // Typing effect delay
                }
                await new Promise((r) => setTimeout(r, 200)); // Wait after word is completed
                for (let i = prompt.length; i >= 0; i--) {
                    setPlaceholder(prompt.slice(0, i));
                    await new Promise((r) => setTimeout(r, 100)); // Deleting effect delay
                }
                await new Promise((r) => setTimeout(r, 200)); // Wait after deleting is completed
            }
        }
    }

    onMount(() => {
        typePlaceholder(activityPrompts, (val) => (activityPlaceholder = val));
        typePlaceholder(stylePrompts, (val) => (stylePlaceholder = val), 1500); // Start style animation after 1500ms
        console.log(API_URL);
    });

    async function generateImage() {
        if (activity && style) {
            const prompt = `${subject} ${activity} in the style of ${style}`;

            try {
                $isGenerating = true;
                const response = await fetch(API_URL + "/generate", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ prompt: prompt }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                $generatedImageUrl = data.url; // Assuming the response has an `url` field
                $isGenerating = false;

                // Optionally, refresh the gallery after generating a new image
                // await loadGallery();
            } catch (error) {
                $isGenerating = false;
                console.error("Error generating image:", error);
            }
        } else {
            console.log("Subject, activity, and style must be provided");
        }
    }
</script>

<div class="input">
    <div class="input-area">
        <div class="single-input">
            <label>
                Doodle me {subject}...
                <input
                    type="text"
                    bind:value={activity}
                    placeholder={activityPlaceholder}
                />
            </label>
        </div>
        <div class="single-input">
            <label>
                in the style of
                <input
                    type="text"
                    bind:value={style}
                    placeholder={stylePlaceholder}
                />
            </label>
        </div>
        <button on:click={generateImage}>generate 🙈</button>
    </div>
</div>

<style>
    .input {
        margin-top: 3rem;
    }
    .single-input {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
    }
    .input-area {
        font-family: "Shantell Sans", sans-serif;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .input-area input::placeholder {
        color: #666; /* Lighter font color for placeholder text */
        opacity: 1; /* Override any default styles that might make it lighter */
    }

    /* Make sure to reset the input text color if it's been globally styled */
    .input-area input {
        color: #000; /* Or any other color you want for the input text */
    }

    /* Additional CSS styles */
</style>

