#!/usr/bin/perl
#
use strict;
use mu;
use Data::Dump qw(dump);;
use Data::Compare;
my $bfenummer = '100000209';
my $objref03 = MUSamletFastEjendom('test03','SFEBFEnr',$bfenummer);
open(T03, ">test03.dmp");
print T03 dump $objref03;
open(T06, ">test06.dmp");

my $objref06 = MUSamletFastEjendom('test06','SFEBFEnr',$bfenummer);
print T06 dump $objref06;

my $c = new Data::Compare;

if ($c->Cmp(\$objref03,\$objref06)) {
	printf "Match\n";
}