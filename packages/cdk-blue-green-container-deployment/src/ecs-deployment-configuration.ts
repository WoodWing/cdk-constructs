import { IEcsDeploymentConfig, CfnDeploymentConfigProps, CfnDeploymentConfig } from '@aws-cdk/aws-codedeploy';

import { Aws, Construct } from '@aws-cdk/core';

type EcsDeploymentConfigurationProps = Omit<CfnDeploymentConfigProps, 'computePlatform'>;

export class EcsDeploymentConfiguration extends Construct {
  readonly ecsDeploymentConfig: IEcsDeploymentConfig;

  constructor(scope: Construct, id: string, props: EcsDeploymentConfigurationProps) {
    super(scope, id);

    const cfnDeploymentConfig = new CfnDeploymentConfig(this, 'EcsDeploymentConfiguration', {
      computePlatform: 'ECS',
      ...props,
    });

    const deployConfigurationName = props.deploymentConfigName ?? cfnDeploymentConfig.ref;

    this.ecsDeploymentConfig = {
      deploymentConfigName: deployConfigurationName,
      deploymentConfigArn: this.arnForDeploymentConfig(deployConfigurationName),
    };
  }

  private arnForDeploymentConfig(deploymentConfigurationName: string): string {
    return `arn:${Aws.PARTITION}:codedeploy:${Aws.REGION}:${Aws.ACCOUNT_ID}:deploymentconfig:${deploymentConfigurationName}`;
  }
}
