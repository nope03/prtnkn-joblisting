fx_version 'adamant'
game 'gta5'

author 'Pratnoken'
description 'Job Listing'
version '1.0.0'

lua54 'yes'

shared_script {
    '@es_extended/imports.lua',
    '@ox_lib/init.lua',
    'shared/config.lua'
}


client_scripts {
    'client/*.lua'
}

server_scripts {
    '@oxmysql/lib/MySQL.lua',
    'server/*.lua'
}

ui_page 'web/index.html'

files {
    'web/index.html',
    'web/style.css',
    'web/script.js',
    'locales/*.json'
}