import {StackProps, Stage, StageProps} from 'aws-cdk-lib'
import * as cdk from 'aws-cdk-lib'
import {CodePipeline, CodePipelineSource, ManualApprovalStep, ShellStep} from 'aws-cdk-lib/pipelines'
import {SPADeploy} from 'cdk-spa-deploy'
import { Construct } from 'constructs'

export class CdkHelloWorldStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new SPADeploy(this, 'HelloWorldApp', {
      ipFilter: true,
      ipList: ['114.23.233.11']
    }).createBasicSite({
      indexDoc: 'index.html',
      websiteFolder: 'site'
    })
  }
}

export class AppStage extends Stage {

  constructor(scope: Construct, id: string, props: StageProps) {
    super(scope, id, props)

    new CdkHelloWorldStack(this, 'CdkHelloWorldStack', {})
  }
}

export class HelloWorldPipeline extends cdk.Stack {

  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props)

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
      synth,
    })

    const appStage = pipeline.addStage(new AppStage(this, 'HelloWorldApp', {}))
    appStage.addPre(new ManualApprovalStep('Approval'))
  }
}
