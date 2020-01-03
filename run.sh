#!/bin/bash
for (( num=1; num <= $1; num++ ))
do
  node index.js >> logs.txt
done