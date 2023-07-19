function footer() {
    return (
        <footer class="container  max-w-7xl mx-auto px-4 font-body undefined">
            <div class="fixed mt-7  w-full bg-orange-100 left-0 bottom-0  px-4 py-2 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
                <nav class="flex flex-wrap justify-center -mx-5 -my-2">
                    <div class="flex px-5 py-2">
                        <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M169.7 .9c-22.8-1.6-41.9 14-47.5 34.7L110.4 80c.5 0 1.1 0 1.6 0c176.7 0 320 143.3 320 320c0 .5 0 1.1 0 1.6l44.4-11.8c20.8-5.5 36.3-24.7 34.7-47.5C498.5 159.5 352.5 13.5 169.7 .9zM399.8 410.2c.1-3.4 .2-6.8 .2-10.2c0-159.1-128.9-288-288-288c-3.4 0-6.8 .1-10.2 .2L.5 491.9c-1.5 5.5 .1 11.4 4.1 15.4s9.9 5.6 15.4 4.1L399.8 410.2zM176 208a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm64 128a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM96 384a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
                        </svg>
                        <a href="/" class="pl-2 leading-6 text-orange-600 no-underline font-bold text-lg font-serif animate-pulse hover:text-gray-900">
                            Pizza Mania
                        </a>
                    </div>
                    <div class="px-5 py-2">
                        <a href="/" class="leading-6 font-serif text-orange-600 no-underline font-bold  hover:text-gray-900">
                            Contact Us Now <span class="text-black font-serif animate-pulse text-lg"> - 077-1556157</span>
                        </a>
                    </div>

                </nav>

            </div>
        </footer>
    );
}

export default footer;