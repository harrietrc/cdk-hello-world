import {Stack, StackProps, Stage, StageProps} from 'aws-cdk-lib'
import {CodePipeline, CodePipelineSource, ManualApprovalStep, ShellStep} from 'aws-cdk-lib/pipelines'
import {SPADeploy} from 'cdk-spa-deploy'
import {Construct} from 'constructs'

export class CdkHelloWorldStack extends Stack {
    public static readonly officeIp = '114.23.233.11'

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props)

        new SPADeploy(this, 'HelloWorldSite', {
            ipFilter: true,
            ipList: [CdkHelloWorldStack.officeIp]
        }).createBasicSite({
            indexDoc: 'index.html',
            websiteFolder: 'site',
        })
    }
}

export class HelloWorldPipelineStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        this.createPipeline()
    }

    public createPipeline(): CodePipeline {
        const source = CodePipelineSource.gitHub('harrietrc/cdk-hello-world', 'master')

        const synth = new ShellStep('Synth', {
            input: source,
            commands: [
                'npm ci',
                'npm ci --prefix site',
                'npm run build --prefix site',
                'npm run test',
                'npx cdk synth'
            ]
        })

        const pipeline = new CodePipeline(this, 'HelloWorldPipeline', {
            pipelineName: 'HelloWorldPipeline',
            synth,
        })

        const appStage = pipeline.addStage(new AppStage(this, 'HelloWorldApp', {}))
        appStage.addPre(new ManualApprovalStep('Approval'))

        return pipeline
    }
}

export class AppStage extends Stage {
    constructor(scope: Construct, id: string, props: StageProps) {
        super(scope, id, props)

        new CdkHelloWorldStack(this, 'HelloWorldStack')
    }
}
