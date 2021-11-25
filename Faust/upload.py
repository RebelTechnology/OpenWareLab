#!/usr/bin/env python3

import argparse
import os
import subprocess

parser = argparse.ArgumentParser('Upload Faust samples')
parser.add_argument('--owl', help='path to OwlProgram directory', default='../../OwlProgram/')
parser.add_argument('--slot', help='slot number used for first patch', default=1, type=int)
parser.add_argument('--load', help='load patches instead of storing', action=argparse.BooleanOptionalAction)

args = parser.parse_args()

faust_files = [fname for fname in os.listdir() if fname.endswith('.dsp')]
faust_files.sort()

cwd = os.path.abspath('.')
owl = os.path.abspath(args.owl)

env = os.environ.copy()

print(f'Using OWL program from {owl}')

env['PATCHSOURCE'] = os.getcwd()

for i, fname in enumerate(faust_files):
    # set env vars for current patch processing
    env['FAUST'] = fname[:-4]
    env['PATCHNAME'] = fname[2:-4]
    print()
    if args.load:
       # load patch
       subprocess.run(['make', 'clean', 'load'], cwd=os.path.abspath(args.owl), env=env, check=True)
    else:
       # store patch
       env['SLOT'] = str(args.slot + i)
       print(f'{env["SLOT"]} <= {env["FAUST"]}')
       subprocess.run(['make', 'clean', 'store'], cwd=os.path.abspath(args.owl), env=env, check=True)
