export EDITOR="/usr/local/bin/mate -w"
export CLICOLOR=1
export LSCOLORS=BxBxhxDxFxhxhxhxhxcxcx

export SVN_EDITOR=emacs

alias cds="cd ~/Sites/"
alias cdns="cd /Users/nerdlife/Sites/"
alias cdh="cd ~/"
alias ..='cd ..'
alias ...='cd ../../'
alias ....='cd ../../../'
alias .....='cd ../../../../'
alias sshamz="ssh -i ~/.ssh/aws.pem ubuntu@54.200.205.215"
alias lsa="ls -ACFt"
alias ls="ls -AF"


#export PS1="\[\e[color\]π \[\e[m\]: \W: "
export PS1="\[\e[00;36m\]π\[\e[0m\] | \[\e[0m\]\[\e[00;35m\]\W\[\e[0m\]\[\e[00;37m\] \[\e[0m\]: "
#PS1="\[\e[00;36m\]π\[\e[0m\]\[\e[00;37m\] :\[\e[0m\]\[\e[00;35m\]\W\[\e[0m\]\[\e[00;37m\] \[\e[0m\]"

#export PS1="∞ : \W: "

#\[\e[color\]
# Glass droid stuff

#  export PATH=$PATH:/Users/worker_bee/Development/droid/dev\ tookit/sdk/platform-tools/


### Added By The Heroku Toolbelt
export PATH="/usr/local/heroku/bin:$PATH"

[ -s $HOME/.nvm/nvm.sh ] && . $HOME/.nvm/nvm.sh # This loads NVM
