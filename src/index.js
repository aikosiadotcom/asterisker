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
  .option("-l, --link","Read asterisker field (type array) from package.json",false)
  .argument("[name...]","Package name. Example: asterisker @aikosia/automaton-core @aikosia/automaton-cli")
  .action(asterisker)

program.parseAsync(process.argv);

async function asterisker(args,option){
    try{
        let dependencies = args.map(val=>val.trim()).filter(val=>val.length);
        const pkg = await readPackage();
        
        if(!dependencies.length){
            if(!(option.asterisker || pkg["asterisker"] || Array.isArray(pkg["asterisker"]))){
                return;
            }else{
                dependencies = pkg["asterisker"].map(val=>val.trim());
                if(!dependencies.length){
                    return;
                }
            }
        }

        console.log("asterisker",`if ${dependencies} exists then change to '*'`);
        const specs = ['dependencies','devDependencies','peerDependencies','peerDependenciesMeta','bundleDependencies','optionalDependencies']
        const obj = {};
        specs.forEach((val)=>{
            if(pkg[val] !== undefined){
                obj[val] = s=>{
                    dependencies.forEach(element => {
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