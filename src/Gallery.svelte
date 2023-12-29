<script>
    import { onMount } from "svelte";
    import ImageViewer from "./ImageViewer.svelte";

    const API_URL = import.meta.env.VITE_API_URL;
    import { SyncLoader } from "svelte-loading-spinners";
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

    let isLoading = true;
    let imagesLoaded = 0;

    // Function called each time an image finishes loading
    function onImageLoad() {
        imagesLoaded += 1;
        console.log("im here", imagesLoaded);
        console.log(images.length);
        if (imagesLoaded === images.length) {
            // All images are loaded, now display them
            console.log("im giga here ");
            document.querySelectorAll(".image").forEach((img) => {
                img.style.opacity = 1;
            });
            isLoading = false;
        }
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

    let selectedImage = null;

    function openImageViewer(image) {
        selectedImage = image;
    }

    function closeImageViewer() {
        selectedImage = null;
    }
</script>

<h2>previous doodles</h2>
{#if isLoading}
    <div class="loading">
        <SyncLoader color="#F6BE00" />
    </div>
{/if}
<div class="gallery">
    {#each images as image, index (image.id)}
        <div
            class="thumbnail"
            title={image.prompt}
            on:click={toggleOverlay}
            style="animation-delay: {index * 100}ms; opacity: 0;"
            on:load={onImageLoad}
        >
            <img
                src={image.url}
                alt={image.prompt}
                class="image"
                on:load={onImageLoad}
            />
            <div class="prompt-overlay">
                {image.prompt}
                <span
                    class="expand-emoji"
                    on:click={() => openImageViewer(image)}>🔍</span
                >
            </div>
        </div>
    {/each}
</div>
<ImageViewer {selectedImage} onClose={closeImageViewer} />

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
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 1rem;
        justify-content: center;
        margin-top: 1rem;
        overflow-y: hidden; /* Hide vertical scrollbar */
        margin-bottom: 5rem;
    }

    .thumbnail {
        position: relative;
        border: 1px solid #ccc;
        overflow: hidden;
        aspect-ratio: 1 / 1; /* Makes the container square */
        animation: fadeIn 0.5s ease-in;
        animation-fill-mode: both;
    }

    .thumbnail img {
        width: 100%;
        height: 100%;
        object-fit: cover; /* Ensures images cover the thumbnail area */
        display: block;
        opacity: 1;
        transition: opacity 0.5s ease-in-out;
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

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .expand-emoji,
    .minimize-emoji {
        position: absolute;
        bottom: 10px;
        right: 10px;
        font-size: 1.5em;
        cursor: pointer;
    }

    .minimize-emoji {
        display: none;
    }

    .thumbnail.expanded .minimize-emoji {
        display: block;
    }

    .thumbnail.expanded .expand-emoji {
        display: none;
    }
</style>
