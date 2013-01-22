({
    appDir: "../",
    
    mainConfigFile: './main.js',
    
    dir: "../build",

    modules: [
        {
            name: "main",

            include: [
                "libs/underscore",
                "libs/backbone",
                "libs/fancybox/fancybox", 
                "libs/script",
                "app"
            ]
        },
        
        {
            name: "app"
        }
    ]
})
