#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import {CdkHelloWorldStack, HelloWorldPipeline} from '../lib/cdk-hello-world-stack';

const app = new cdk.App()
const pipeline = new HelloWorldPipeline(app, 'HelloWorldPipeline', {})
