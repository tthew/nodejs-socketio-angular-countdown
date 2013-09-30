module.exports = function (grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		exec: {
			server: {
				cmd: 'node server/server.js'
			},
			client: {
				cmd: 'cd client && grunt server'
			}
		}
	});

	grunt.loadNpmTasks('grunt-exec');
	grunt.registerTask('client', 'exec:client');
	grunt.registerTask('server', 'exec:server');
	grunt.registerTask('demo', ['exec:client', 'exec:server']);

};
