import {App} from 'aws-cdk-lib'
import {Template} from 'aws-cdk-lib/assertions'
import {CdkHelloWorldStack} from '../lib/cdk-hello-world-stack'

describe('Hello world stack', () => {
    test('allows access from the office', () => {
        const stack = new CdkHelloWorldStack(new App(), 'TestStack')
        const assert = Template.fromStack(stack)

        assert.resourceCountIs('AWS::S3::BucketPolicy', 1)
        assert.hasResourceProperties('AWS::S3::BucketPolicy', {
            PolicyDocument: {
                Statement: [
                    {
                        Condition: {
                            IpAddress: {
                                'aws:SourceIp': ['114.23.233.11']
                            }
                        }
                    }
                ]
            }
        })
    })
})
