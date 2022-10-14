#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import {HelloWorldPipelineStack} from '../lib/cdk-hello-world-stack';

const app = new cdk.App()
new HelloWorldPipelineStack(app, 'CdkHelloWorldStack', {})
