import {App} from 'aws-cdk-lib'
import {Template} from 'aws-cdk-lib/assertions'
import {CdkHelloWorldStack} from '../lib/cdk-hello-world-stack'

describe('Hello World site', () => {
    test('can only accessed from the office', () => {
        const stack = new CdkHelloWorldStack(new App(), 'TestStack')
        const assert = Template.fromStack(stack)

        assert.resourceCountIs('AWS::S3::BucketPolicy', 1)
        assert.hasResourceProperties('AWS::S3::BucketPolicy', {
            PolicyDocument: {
                Statement: [
                    {
                        Condition: {
                            IpAddress: {
                                'aws:SourceIp': [
                                    CdkHelloWorldStack.officeIp
                                ]
                            }
                        }
                    }
                ]
            }
        })
    })
})
