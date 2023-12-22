<script>
    import { onMount } from "svelte";

    const API_URL = import.meta.env.VITE_API_URL;
    let images = [];

    onMount(async () => {
        try {
            const response = await fetch(API_URL + "/gallery");
            if (!response.ok) {
                throw new Error("Error fetching gallery images");
            }
            images = await response.json();
        } catch (error) {
            console.error("Error:", error);
        }
    });

    function onLoad(event) {
        // Add a class to the image element when it's loaded
        console.log("Image loaded:", event.target);
        event.target.classList.add("loaded");
    }
    // Function to toggle overlay visibility
    function toggleOverlay(event) {
        // Find the closest parent with class 'thumbnail'
        const thumbnail = event.currentTarget;
        // Find the overlay within this thumbnail
        const overlay = thumbnail.querySelector(".prompt-overlay");
        // Toggle the 'active' class
        overlay.classList.toggle("active");
    }
</script>

<h2>previous doodles ッ</h2>
<div class="gallery">
    {#each images as image (image.id)}
        <div class="thumbnail" title={image.prompt} on:click={toggleOverlay}>
            <img
                src={image.url}
                alt={image.prompt}
                class="image"
                on:load={onLoad}
            />
            <div class="prompt-overlay">
                {image.prompt}
            </div>
        </div>
    {/each}
</div>

<style>
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    .gallery {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1rem;
        margin-top: 1rem;
        overflow-y: auto;
        margin-bottom: 5rem;
    }

    .thumbnail {
        position: relative;
        width: 150px;
        height: 150px;
        border: 1px solid #ccc;
        overflow: hidden;
    }

    .thumbnail img {
        max-width: 100%;
        max-height: 100%;
        display: block;
        opacity: 1;
        transition: opacity 0.5s ease-in-out; /* Transition for the image opacity */
    }

    .prompt-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black */
        color: white;
        padding: 5px;
        text-align: center;
        font-size: 0.8em; /* Smaller font size */
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0; /* Initially transparent */
        transition: opacity 0.5s ease-in-out; /* Transition for the overlay opacity */
    }

    .thumbnail:hover .prompt-overlay {
        opacity: 1; /* Fully visible on hover */
    }
    .prompt-overlay.active {
        opacity: 1;
    }
</style>
