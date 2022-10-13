import * as cdk from 'aws-cdk-lib'
import {SPADeploy} from 'cdk-spa-deploy'
import { Construct } from 'constructs'

export class CdkHelloWorldStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new SPADeploy(this, 'HelloWorldSite').createBasicSite({
      indexDoc: 'index.html',
      websiteFolder: 'public',
    })
  }
}
