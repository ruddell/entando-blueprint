/* eslint-disable no-console */
/* eslint-disable consistent-return */
const chalk = require('chalk');
const EntityServerGenerator = require('generator-jhipster/generators/entity-server');
const serverFiles = require('./files').serverFiles;
const microFrontEndFiles = require('./files').microFrontEndFiles;

module.exports = class extends EntityServerGenerator {
    constructor(args, opts) {
        super(args, Object.assign({ fromBlueprint: true }, opts)); // fromBlueprint variable is important

        const jhContext = (this.jhipsterContext = this.options.jhipsterContext);

        if (!jhContext) {
            this.error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprint entando')}`);
        }

        this.configOptions = jhContext.configOptions || {};
        if (jhContext.databaseType === 'cassandra') {
            this.pkType = 'UUID';
        }
    }

    get initializing() {
        // initializing - Your initialization methods (checking current project state, getting configs, etc)
        return super._initializing();
    }

    async prompting() {
        // prompting - Where you prompt users for options (where you’d call this.prompt())
        return super._prompting();
    }

    get configuring() {
        // configuring - Saving configurations and configure the project (creating .editorconfig files and other metadata files)
        return super._configuring();
    }

    get default() {
        // default - If the method name doesn’t match a priority, it will be pushed to this group.
        return super._default();
    }

    get writing() {
        // writing - Where you write the generator specific files (routes, controllers, etc)
        const jhipsterPhase = super._writing();
        const myCustomSteps = {
            writeEntityServerFiles() {
                this.writeFilesToDisk(serverFiles, this, false, null);
                this.writeFilesToDisk(microFrontEndFiles, this, false, null);
            },
        };
        return { ...jhipsterPhase, ...myCustomSteps };
    }

    get conflicts() {
        // conflicts - Where conflicts are handled (used internally), no super._conflicts
        return null;
    }

    get install() {
        // install - Where installations are run (npm, bower)
        return super._install();
    }

    get end() {
        // end - Called last, cleanup, say good bye, etc
        return super._end();
    }
};
