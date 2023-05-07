#!/usr/bin/env node
import { Command } from "commander";
import { modifyJsonFile } from "modify-json-file";
import { execSync }  from 'child_process';
import path from 'path';
import {readPackage} from 'read-pkg';

const program = new Command("asterisker");
program
  .name("asterisker")
  .description("Change dependencies package.json to latest")
  .version("1.0.0")
  .argument("<name...>","Package name. Example: asterisker @aikosia/automaton-core @aikosia/automaton-cli")
  .action(asterisker)

program.parseAsync(process.argv);

async function asterisker(args){
    try{
        const dependecies = args.map(val=>val.trim()).filter(val=>val.length);
        console.log("asterisker",`if ${dependecies} exists then change to '*'`);
        const pkg = await readPackage();
        const specs = ['dependencies','devDependencies','peerDependencies','peerDependenciesMeta','bundleDependencies','optionalDependencies']
        const obj = {};
        specs.forEach((val)=>{
            if(pkg[val] !== undefined){
                obj[val] = s=>{
                    dependecies.forEach(element => {
                        if(s[element] !== undefined){
                            console.log("asterisker",`${element} exists`);
                            s[element] = "*";
                        }
                    });
    
                    return s;
                }
            }
        });

        await modifyJsonFile(
            path.join(process.cwd(), "package.json"),
            obj
        );
        
        console.log("asterisker","npm update --save");
        execSync("npm update --save");
        console.log("asterisker","done !");
    }catch(err){
        console.error("asterisker",err);
    }
}