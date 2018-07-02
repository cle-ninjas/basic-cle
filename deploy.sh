#!/usr/bin/env bash
aws s3 cp ../basic-cle s3://stage-passport-resources/basic-cle --exclude ".git/*" --exclude ".idea" --recursive --acl public-read
