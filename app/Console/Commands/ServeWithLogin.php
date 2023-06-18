<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class ServeWithLogin extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'serve-app';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        // Open the login page in the browser
        $url = 'http://localhost:8000/login'; // Update with your login page URL
        exec("start $url");
    
        // Start the server
        $this->info('Starting Laravel development server with login page...');
        $this->call('serve');
    }
}
