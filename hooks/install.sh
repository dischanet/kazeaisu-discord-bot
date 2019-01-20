#!/bin/bash

cd /home/ec2-user/repos/kazeaisu-discord-bot
npm install --production

REGION=$(curl -s http://169.254.169.254/latest/meta-data/local-hostname | cut -d '.' -f2)
PARAMETER_NAME=KAZEAISU_DISCORD_BOT_SECRET
echo "DISCORD_BOT_TOKEN=$(/usr/bin/aws --region ${REGION} ssm get-parameter --name ${PARAMETER_NAME} --query "Parameter.Value" --output text)" > environment
PARAMETER_NAME=KAZEAISU_DISCORD_BOT_docomoAPI
echo "docomoAPI=$(/usr/bin/aws --region ${REGION} ssm get-parameter --name ${PARAMETER_NAME} --query "Parameter.Value" --output text)" > environment
PARAMETER_NAME=KAZEAISU_DISCORD_BOT_a3rt
echo "a3rt=$(/usr/bin/aws --region ${REGION} ssm get-parameter --name ${PARAMETER_NAME} --query "Parameter.Value" --output text)" > environment
PARAMETER_NAME=KAZEAISU_DISCORD_BOT_VTAPI
echo "VTAPI=$(/usr/bin/aws --region ${REGION} ssm get-parameter --name ${PARAMETER_NAME} --query "Parameter.Value" --output text)" > environment
PARAMETER_NAME=KAZEAISU_DISCORD_BOT_fkey
echo "fkey=$(/usr/bin/aws --region ${REGION} ssm get-parameter --name ${PARAMETER_NAME} --query "Parameter.Value" --output text)" > environment

sudo cp ./hooks/kazeaisu-discord-bot.service /etc/systemd/system/kazeaisu-discord-bot.service
sudo /usr/bin/systemctl enable kazeaisu-discord-bot